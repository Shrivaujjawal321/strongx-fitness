import { z } from 'zod';

export const createStaffSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  salary: z.coerce.number().positive('Salary must be positive').optional().nullable(),
  profileImage: z.string().url().optional().nullable(),
});

export const updateStaffSchema = createStaffSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export type CreateStaffInput = z.infer<typeof createStaffSchema>;
export type UpdateStaffInput = z.infer<typeof updateStaffSchema>;
