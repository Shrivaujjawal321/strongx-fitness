import { Request, Response } from 'express';
import { prisma } from '../config/database.js';
import { getDateRange } from '../utils/helpers.js';

export const getDashboardSummary = async (_req: Request, res: Response): Promise<void> => {
  const now = new Date();
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  // Get member counts by status
  const [
    totalMembers,
    activeMembers,
    expiredMembers,
    inactiveMembers,
    suspendedMembers,
  ] = await Promise.all([
    prisma.member.count(),
    prisma.member.count({ where: { status: 'ACTIVE' } }),
    prisma.member.count({ where: { status: 'EXPIRED' } }),
    prisma.member.count({ where: { status: 'INACTIVE' } }),
    prisma.member.count({ where: { status: 'SUSPENDED' } }),
  ]);

  // Get expiring memberships (within 7 days)
  const expiringMemberships = await prisma.membershipHistory.findMany({
    where: {
      status: 'ACTIVE',
      endDate: {
        gte: now,
        lte: sevenDaysFromNow,
      },
    },
    include: {
      member: {
        select: {
          id: true,
          memberId: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },
      plan: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      endDate: 'asc',
    },
  });

  // Get new members this month
  const { start: monthStart } = getDateRange('month');
  const newMembersThisMonth = await prisma.member.count({
    where: {
      joinDate: {
        gte: monthStart,
      },
    },
  });

  // Get total staff and trainers
  const [totalStaff, totalTrainers] = await Promise.all([
    prisma.staff.count({ where: { isActive: true } }),
    prisma.trainer.count({ where: { isActive: true } }),
  ]);

  res.json({
    members: {
      total: totalMembers,
      active: activeMembers,
      expired: expiredMembers,
      inactive: inactiveMembers,
      suspended: suspendedMembers,
      newThisMonth: newMembersThisMonth,
    },
    expiringMemberships: expiringMemberships.map((m) => ({
      id: m.id,
      memberId: m.member.memberId,
      memberName: `${m.member.firstName} ${m.member.lastName}`,
      email: m.member.email,
      phone: m.member.phone,
      planName: m.plan.name,
      endDate: m.endDate,
      daysRemaining: Math.ceil(
        (m.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      ),
    })),
    staff: {
      total: totalStaff,
    },
    trainers: {
      total: totalTrainers,
    },
  });
};

export const getRevenueSummary = async (_req: Request, res: Response): Promise<void> => {
  const { start: todayStart, end: todayEnd } = getDateRange('today');
  const { start: monthStart, end: monthEnd } = getDateRange('month');
  const { start: yearStart, end: yearEnd } = getDateRange('year');

  // Get revenue aggregates
  const [todayRevenue, monthRevenue, yearRevenue] = await Promise.all([
    prisma.payment.aggregate({
      where: {
        status: 'COMPLETED',
        paymentDate: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
      _sum: {
        amount: true,
      },
      _count: true,
    }),
    prisma.payment.aggregate({
      where: {
        status: 'COMPLETED',
        paymentDate: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
      _sum: {
        amount: true,
      },
      _count: true,
    }),
    prisma.payment.aggregate({
      where: {
        status: 'COMPLETED',
        paymentDate: {
          gte: yearStart,
          lte: yearEnd,
        },
      },
      _sum: {
        amount: true,
      },
      _count: true,
    }),
  ]);

  // Get recent payments
  const recentPayments = await prisma.payment.findMany({
    take: 5,
    orderBy: {
      paymentDate: 'desc',
    },
    include: {
      member: {
        select: {
          memberId: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  // Get payment method breakdown for this month
  const paymentMethodBreakdown = await prisma.payment.groupBy({
    by: ['paymentMethod'],
    where: {
      status: 'COMPLETED',
      paymentDate: {
        gte: monthStart,
        lte: monthEnd,
      },
    },
    _sum: {
      amount: true,
    },
    _count: true,
  });

  res.json({
    revenue: {
      today: {
        amount: todayRevenue._sum.amount?.toNumber() || 0,
        transactions: todayRevenue._count,
      },
      month: {
        amount: monthRevenue._sum.amount?.toNumber() || 0,
        transactions: monthRevenue._count,
      },
      year: {
        amount: yearRevenue._sum.amount?.toNumber() || 0,
        transactions: yearRevenue._count,
      },
    },
    recentPayments: recentPayments.map((p) => ({
      id: p.id,
      paymentId: p.paymentId,
      memberName: `${p.member.firstName} ${p.member.lastName}`,
      amount: p.amount.toNumber(),
      method: p.paymentMethod,
      date: p.paymentDate,
      status: p.status,
    })),
    paymentMethodBreakdown: paymentMethodBreakdown.map((b) => ({
      method: b.paymentMethod,
      amount: b._sum.amount?.toNumber() || 0,
      count: b._count,
    })),
  });
};
