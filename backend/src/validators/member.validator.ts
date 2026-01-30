import { z } from 'zod';

export const createMemberSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  dateOfBirth: z.string().datetime().optional().nullable(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional().nullable(),
  address: z.string().optional().nullable(),
  emergencyContact: z.string().optional().nullable(),
  profileImage: z.string().url().optional().nullable(),
});

export const updateMemberSchema = createMemberSchema.partial().extend({
  status: z.enum(['ACTIVE', 'INACTIVE', 'EXPIRED', 'SUSPENDED']).optional(),
});

export const memberQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'EXPIRED', 'SUSPENDED']).optional(),
  sortBy: z.enum(['createdAt', 'firstName', 'lastName', 'joinDate']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type CreateMemberInput = z.infer<typeof createMemberSchema>;
export type UpdateMemberInput = z.infer<typeof updateMemberSchema>;
export type MemberQueryInput = z.infer<typeof memberQuerySchema>;
