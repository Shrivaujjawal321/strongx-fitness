import { Request, Response } from 'express';
import { prisma } from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { CreatePlanInput, UpdatePlanInput } from '../validators/plan.validator.js';

export const getPlans = async (req: Request, res: Response): Promise<void> => {
  const { includeInactive } = req.query;

  const where = includeInactive === 'true' ? {} : { isActive: true };

  const plans = await prisma.membershipPlan.findMany({
    where,
    orderBy: { price: 'asc' },
    include: {
      _count: {
        select: { memberships: true },
      },
    },
  });

  const formattedPlans = plans.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price.toNumber(),
    duration: p.duration,
    features: p.features,
    isActive: p.isActive,
    activeMemberships: p._count.memberships,
    createdAt: p.createdAt,
  }));

  res.json({ data: formattedPlans });
};

export const getPlanById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const plan = await prisma.membershipPlan.findUnique({
    where: { id },
    include: {
      _count: {
        select: { memberships: true },
      },
    },
  });

  if (!plan) {
    throw new AppError('Plan not found', 404);
  }

  res.json({
    data: {
      ...plan,
      price: plan.price.toNumber(),
      activeMemberships: plan._count.memberships,
    },
  });
};

export const createPlan = async (req: Request, res: Response): Promise<void> => {
  const input = req.body as CreatePlanInput;

  const plan = await prisma.membershipPlan.create({
    data: {
      name: input.name,
      description: input.description,
      price: input.price,
      duration: input.duration,
      features: input.features,
    },
  });

  res.status(201).json({
    data: {
      ...plan,
      price: plan.price.toNumber(),
    },
  });
};

export const updatePlan = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const input = req.body as UpdatePlanInput;

  const plan = await prisma.membershipPlan.update({
    where: { id },
    data: {
      ...(input.name && { name: input.name }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.price !== undefined && { price: input.price }),
      ...(input.duration !== undefined && { duration: input.duration }),
      ...(input.features && { features: input.features }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
    },
  });

  res.json({
    data: {
      ...plan,
      price: plan.price.toNumber(),
    },
  });
};

export const deletePlan = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Check if plan has active memberships
  const activeMemberships = await prisma.membershipHistory.count({
    where: {
      planId: id,
      status: 'ACTIVE',
    },
  });

  if (activeMemberships > 0) {
    // Soft delete by deactivating
    await prisma.membershipPlan.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({
      message: 'Plan deactivated (has active memberships)',
      deactivated: true,
    });
    return;
  }

  // Hard delete if no active memberships
  await prisma.membershipPlan.delete({
    where: { id },
  });

  res.json({ message: 'Plan deleted successfully' });
};
