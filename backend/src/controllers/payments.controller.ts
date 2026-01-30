import { Request, Response } from 'express';
import { prisma } from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { generateId, getPaginationMeta } from '../utils/helpers.js';
import { CreatePaymentInput, PaymentQueryInput } from '../validators/payment.validator.js';

export const getPayments = async (req: Request, res: Response): Promise<void> => {
  const {
    page = 1,
    limit = 10,
    memberId,
    status,
    startDate,
    endDate,
  } = req.query as unknown as PaymentQueryInput;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {};

  if (memberId) {
    where.memberId = memberId;
  }

  if (status) {
    where.status = status;
  }

  if (startDate || endDate) {
    where.paymentDate = {};
    if (startDate) {
      where.paymentDate.gte = new Date(startDate);
    }
    if (endDate) {
      where.paymentDate.lte = new Date(endDate);
    }
  }

  const [payments, total] = await Promise.all([
    prisma.payment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { paymentDate: 'desc' },
      include: {
        member: {
          select: {
            id: true,
            memberId: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        invoice: {
          select: {
            id: true,
            invoiceNumber: true,
          },
        },
      },
    }),
    prisma.payment.count({ where }),
  ]);

  const formattedPayments = payments.map((p) => ({
    id: p.id,
    paymentId: p.paymentId,
    member: {
      id: p.member.id,
      memberId: p.member.memberId,
      name: `${p.member.firstName} ${p.member.lastName}`,
      email: p.member.email,
    },
    amount: p.amount.toNumber(),
    paymentMethod: p.paymentMethod,
    paymentDate: p.paymentDate,
    status: p.status,
    description: p.description,
    invoiceNumber: p.invoice?.invoiceNumber || null,
  }));

  res.json({
    data: formattedPayments,
    pagination: getPaginationMeta(page, limit, total),
  });
};

export const getPaymentById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const payment = await prisma.payment.findUnique({
    where: { id },
    include: {
      member: true,
      invoice: true,
    },
  });

  if (!payment) {
    throw new AppError('Payment not found', 404);
  }

  res.json({
    data: {
      ...payment,
      amount: payment.amount.toNumber(),
    },
  });
};

export const createPayment = async (req: Request, res: Response): Promise<void> => {
  const input = req.body as CreatePaymentInput;

  // Verify member exists
  const member = await prisma.member.findUnique({
    where: { id: input.memberId },
  });

  if (!member) {
    throw new AppError('Member not found', 404);
  }

  const paymentId = await generateId('PAY', 'Payment');
  const invoiceNumber = await generateId('INV', 'Invoice');

  // Create payment with invoice in a transaction
  const payment = await prisma.$transaction(async (tx) => {
    // Create payment
    const newPayment = await tx.payment.create({
      data: {
        paymentId,
        memberId: input.memberId,
        amount: input.amount,
        paymentMethod: input.paymentMethod,
        description: input.description,
        status: 'COMPLETED',
      },
    });

    // Create invoice
    await tx.invoice.create({
      data: {
        invoiceNumber,
        paymentId: newPayment.id,
        issuedDate: new Date(),
      },
    });

    // If plan is specified, create/renew membership
    if (input.planId) {
      const plan = await tx.membershipPlan.findUnique({
        where: { id: input.planId },
      });

      if (plan) {
        const start = new Date();
        const end = new Date(start);
        end.setDate(end.getDate() + plan.duration);

        // Deactivate existing active membership
        await tx.membershipHistory.updateMany({
          where: {
            memberId: input.memberId,
            status: 'ACTIVE',
          },
          data: {
            status: 'CANCELLED',
          },
        });

        // Create new membership
        await tx.membershipHistory.create({
          data: {
            memberId: input.memberId,
            planId: input.planId,
            startDate: start,
            endDate: end,
            status: 'ACTIVE',
          },
        });

        // Update member status
        await tx.member.update({
          where: { id: input.memberId },
          data: { status: 'ACTIVE' },
        });
      }
    }

    return newPayment;
  });

  // Fetch the complete payment with relations
  const fullPayment = await prisma.payment.findUnique({
    where: { id: payment.id },
    include: {
      member: {
        select: {
          memberId: true,
          firstName: true,
          lastName: true,
        },
      },
      invoice: true,
    },
  });

  res.status(201).json({
    data: {
      ...fullPayment,
      amount: fullPayment?.amount.toNumber(),
    },
  });
};

export const refundPayment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const payment = await prisma.payment.findUnique({
    where: { id },
  });

  if (!payment) {
    throw new AppError('Payment not found', 404);
  }

  if (payment.status !== 'COMPLETED') {
    throw new AppError('Only completed payments can be refunded', 400);
  }

  const updatedPayment = await prisma.payment.update({
    where: { id },
    data: { status: 'REFUNDED' },
  });

  res.json({
    data: {
      ...updatedPayment,
      amount: updatedPayment.amount.toNumber(),
    },
    message: 'Payment refunded successfully',
  });
};
