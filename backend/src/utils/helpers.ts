import { prisma } from '../config/database.js';

/**
 * Generate a unique ID with a prefix
 * Example: generateId('SX', 'Member') => 'SX-001'
 */
export async function generateId(prefix: string, entity: 'Member' | 'Payment' | 'Staff' | 'Trainer' | 'Invoice'): Promise<string> {
  let count = 0;

  switch (entity) {
    case 'Member':
      count = await prisma.member.count();
      break;
    case 'Payment':
      count = await prisma.payment.count();
      break;
    case 'Staff':
      count = await prisma.staff.count();
      break;
    case 'Trainer':
      count = await prisma.trainer.count();
      break;
    case 'Invoice':
      count = await prisma.invoice.count();
      break;
  }

  return `${prefix}-${String(count + 1).padStart(4, '0')}`;
}

/**
 * Calculate pagination metadata
 */
export function getPaginationMeta(
  page: number,
  limit: number,
  total: number
) {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Calculate date range for queries
 */
export function getDateRange(period: 'today' | 'week' | 'month' | 'year') {
  const now = new Date();
  const start = new Date();

  switch (period) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      break;
    case 'week':
      start.setDate(now.getDate() - 7);
      break;
    case 'month':
      start.setMonth(now.getMonth(), 1);
      start.setHours(0, 0, 0, 0);
      break;
    case 'year':
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      break;
  }

  return { start, end: now };
}

/**
 * Check if a membership is expiring within given days
 */
export function isExpiringWithinDays(endDate: Date, days: number): boolean {
  const now = new Date();
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + days);

  return endDate > now && endDate <= targetDate;
}
