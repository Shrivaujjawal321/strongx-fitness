import { Request, Response } from 'express';
import { prisma } from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { generateId } from '../utils/helpers.js';
import { CreateTrainerInput, UpdateTrainerInput } from '../validators/trainer.validator.js';

export const getTrainers = async (req: Request, res: Response): Promise<void> => {
  const { includeInactive } = req.query;

  const where = includeInactive === 'true' ? {} : { isActive: true };

  const trainers = await prisma.trainer.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  const formattedTrainers = trainers.map((t) => ({
    ...t,
    salary: t.salary?.toNumber() || null,
  }));

  res.json({ data: formattedTrainers });
};

export const getTrainerById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const trainer = await prisma.trainer.findUnique({
    where: { id },
  });

  if (!trainer) {
    throw new AppError('Trainer not found', 404);
  }

  res.json({
    data: {
      ...trainer,
      salary: trainer.salary?.toNumber() || null,
    },
  });
};

export const createTrainer = async (req: Request, res: Response): Promise<void> => {
  const input = req.body as CreateTrainerInput;

  const trainerId = await generateId('TRN', 'Trainer');

  const trainer = await prisma.trainer.create({
    data: {
      trainerId,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      specialization: input.specialization,
      certification: input.certification,
      experience: input.experience,
      salary: input.salary,
      profileImage: input.profileImage,
      bio: input.bio,
    },
  });

  res.status(201).json({
    data: {
      ...trainer,
      salary: trainer.salary?.toNumber() || null,
    },
  });
};

export const updateTrainer = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const input = req.body as UpdateTrainerInput;

  const trainer = await prisma.trainer.update({
    where: { id },
    data: {
      ...(input.firstName && { firstName: input.firstName }),
      ...(input.lastName && { lastName: input.lastName }),
      ...(input.email && { email: input.email }),
      ...(input.phone && { phone: input.phone }),
      ...(input.specialization && { specialization: input.specialization }),
      ...(input.certification && { certification: input.certification }),
      ...(input.experience !== undefined && { experience: input.experience }),
      ...(input.salary !== undefined && { salary: input.salary }),
      ...(input.profileImage !== undefined && { profileImage: input.profileImage }),
      ...(input.bio !== undefined && { bio: input.bio }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
    },
  });

  res.json({
    data: {
      ...trainer,
      salary: trainer.salary?.toNumber() || null,
    },
  });
};

export const deleteTrainer = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Soft delete
  await prisma.trainer.update({
    where: { id },
    data: { isActive: false },
  });

  res.json({ message: 'Trainer deactivated successfully' });
};
