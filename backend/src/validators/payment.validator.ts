import { z } from 'zod';

export const createPaymentSchema = z.object({
  memberId: z.string().uuid('Invalid member ID'),
  amount: z.coerce.number().positive('Amount must be positive'),
  paymentMethod: z.enum(['CASH', 'CARD', 'BANK_TRANSFER', 'ONLINE']),
  description: z.string().optional().nullable(),
  planId: z.string().uuid('Invalid plan ID').optional(),
});

export const paymentQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  memberId: z.string().uuid().optional(),
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type PaymentQueryInput = z.infer<typeof paymentQuerySchema>;
