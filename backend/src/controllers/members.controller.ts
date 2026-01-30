import { Request, Response } from 'express';
import { prisma } from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { generateId, getPaginationMeta } from '../utils/helpers.js';
import {
  CreateMemberInput,
  UpdateMemberInput,
  MemberQueryInput,
} from '../validators/member.validator.js';

export const getMembers = async (req: Request, res: Response): Promise<void> => {
  const {
    page = 1,
    limit = 10,
    search,
    status,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = req.query as unknown as MemberQueryInput;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {};

  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { memberId: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search } },
    ];
  }

  if (status) {
    where.status = status;
  }

  // Get members with pagination
  const [members, total] = await Promise.all([
    prisma.member.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      include: {
        memberships: {
          where: { status: 'ACTIVE' },
          take: 1,
          orderBy: { endDate: 'desc' },
          include: {
            plan: {
              select: { name: true },
            },
          },
        },
      },
    }),
    prisma.member.count({ where }),
  ]);

  const formattedMembers = members.map((m) => ({
    id: m.id,
    memberId: m.memberId,
    firstName: m.firstName,
    lastName: m.lastName,
    email: m.email,
    phone: m.phone,
    status: m.status,
    joinDate: m.joinDate,
    profileImage: m.profileImage,
    currentPlan: m.memberships[0]?.plan.name || null,
    membershipEndDate: m.memberships[0]?.endDate || null,
  }));

  res.json({
    data: formattedMembers,
    pagination: getPaginationMeta(page, limit, total),
  });
};

export const getMemberById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const member = await prisma.member.findUnique({
    where: { id },
    include: {
      memberships: {
        orderBy: { startDate: 'desc' },
        include: {
          plan: true,
        },
      },
      payments: {
        orderBy: { paymentDate: 'desc' },
        take: 10,
        include: {
          invoice: true,
        },
      },
    },
  });

  if (!member) {
    throw new AppError('Member not found', 404);
  }

  res.json({ data: member });
};

export const createMember = async (req: Request, res: Response): Promise<void> => {
  const input = req.body as CreateMemberInput;

  const memberId = await generateId('SX', 'Member');

  const member = await prisma.member.create({
    data: {
      memberId,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : null,
      gender: input.gender,
      address: input.address,
      emergencyContact: input.emergencyContact,
      profileImage: input.profileImage,
    },
  });

  res.status(201).json({ data: member });
};

export const updateMember = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const input = req.body as UpdateMemberInput;

  const member = await prisma.member.update({
    where: { id },
    data: {
      ...(input.firstName && { firstName: input.firstName }),
      ...(input.lastName && { lastName: input.lastName }),
      ...(input.email && { email: input.email }),
      ...(input.phone && { phone: input.phone }),
      ...(input.dateOfBirth !== undefined && {
        dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : null,
      }),
      ...(input.gender !== undefined && { gender: input.gender }),
      ...(input.address !== undefined && { address: input.address }),
      ...(input.emergencyContact !== undefined && {
        emergencyContact: input.emergencyContact,
      }),
      ...(input.profileImage !== undefined && { profileImage: input.profileImage }),
      ...(input.status && { status: input.status }),
    },
  });

  res.json({ data: member });
};

export const deleteMember = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Soft delete by setting status to INACTIVE
  await prisma.member.update({
    where: { id },
    data: { status: 'INACTIVE' },
  });

  res.json({ message: 'Member deactivated successfully' });
};

export const getMembershipHistory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const member = await prisma.member.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!member) {
    throw new AppError('Member not found', 404);
  }

  const history = await prisma.membershipHistory.findMany({
    where: { memberId: id },
    orderBy: { startDate: 'desc' },
    include: {
      plan: true,
    },
  });

  res.json({ data: history });
};

export const addMembership = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { planId, startDate } = req.body;

  // Get the plan to calculate end date
  const plan = await prisma.membershipPlan.findUnique({
    where: { id: planId },
  });

  if (!plan) {
    throw new AppError('Plan not found', 404);
  }

  const start = startDate ? new Date(startDate) : new Date();
  const end = new Date(start);
  end.setDate(end.getDate() + plan.duration);

  // Deactivate any existing active membership
  await prisma.membershipHistory.updateMany({
    where: {
      memberId: id,
      status: 'ACTIVE',
    },
    data: {
      status: 'CANCELLED',
    },
  });

  // Create new membership
  const membership = await prisma.membershipHistory.create({
    data: {
      memberId: id,
      planId,
      startDate: start,
      endDate: end,
      status: 'ACTIVE',
    },
    include: {
      plan: true,
    },
  });

  // Update member status to ACTIVE
  await prisma.member.update({
    where: { id },
    data: { status: 'ACTIVE' },
  });

  res.status(201).json({ data: membership });
};
