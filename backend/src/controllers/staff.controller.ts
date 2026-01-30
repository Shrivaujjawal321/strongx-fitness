import { Request, Response } from 'express';
import { prisma } from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { generateId } from '../utils/helpers.js';
import { CreateStaffInput, UpdateStaffInput } from '../validators/staff.validator.js';

export const getStaff = async (req: Request, res: Response): Promise<void> => {
  const { includeInactive } = req.query;

  const where = includeInactive === 'true' ? {} : { isActive: true };

  const staff = await prisma.staff.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  const formattedStaff = staff.map((s) => ({
    ...s,
    salary: s.salary?.toNumber() || null,
  }));

  res.json({ data: formattedStaff });
};

export const getStaffById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const staff = await prisma.staff.findUnique({
    where: { id },
  });

  if (!staff) {
    throw new AppError('Staff member not found', 404);
  }

  res.json({
    data: {
      ...staff,
      salary: staff.salary?.toNumber() || null,
    },
  });
};

export const createStaff = async (req: Request, res: Response): Promise<void> => {
  const input = req.body as CreateStaffInput;

  const staffId = await generateId('STF', 'Staff');

  const staff = await prisma.staff.create({
    data: {
      staffId,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      role: input.role,
      salary: input.salary,
      profileImage: input.profileImage,
    },
  });

  res.status(201).json({
    data: {
      ...staff,
      salary: staff.salary?.toNumber() || null,
    },
  });
};

export const updateStaff = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const input = req.body as UpdateStaffInput;

  const staff = await prisma.staff.update({
    where: { id },
    data: {
      ...(input.firstName && { firstName: input.firstName }),
      ...(input.lastName && { lastName: input.lastName }),
      ...(input.email && { email: input.email }),
      ...(input.phone && { phone: input.phone }),
      ...(input.role && { role: input.role }),
      ...(input.salary !== undefined && { salary: input.salary }),
      ...(input.profileImage !== undefined && { profileImage: input.profileImage }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
    },
  });

  res.json({
    data: {
      ...staff,
      salary: staff.salary?.toNumber() || null,
    },
  });
};

export const deleteStaff = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Soft delete
  await prisma.staff.update({
    where: { id },
    data: { isActive: false },
  });

  res.json({ message: 'Staff member deactivated successfully' });
};
