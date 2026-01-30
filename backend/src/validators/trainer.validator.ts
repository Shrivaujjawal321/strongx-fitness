import { z } from 'zod';

export const createTrainerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  specialization: z.array(z.string()).default([]),
  certification: z.array(z.string()).default([]),
  experience: z.coerce.number().int().min(0, 'Experience must be 0 or more'),
  salary: z.coerce.number().positive('Salary must be positive').optional().nullable(),
  profileImage: z.string().url().optional().nullable(),
  bio: z.string().optional().nullable(),
});

export const updateTrainerSchema = createTrainerSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export type CreateTrainerInput = z.infer<typeof createTrainerSchema>;
export type UpdateTrainerInput = z.infer<typeof updateTrainerSchema>;
