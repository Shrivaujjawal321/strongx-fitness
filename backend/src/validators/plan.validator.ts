import { z } from 'zod';

export const createPlanSchema = z.object({
  name: z.string().min(2, 'Plan name must be at least 2 characters'),
  description: z.string().optional().nullable(),
  price: z.coerce.number().positive('Price must be positive'),
  duration: z.coerce.number().int().positive('Duration must be a positive integer (days)'),
  features: z.array(z.string()).default([]),
});

export const updatePlanSchema = createPlanSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export type CreatePlanInput = z.infer<typeof createPlanSchema>;
export type UpdatePlanInput = z.infer<typeof updatePlanSchema>;
