// Admin Types for StrongX

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'STAFF';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Member {
  id: string;
  memberId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  address?: string;
  emergencyContact?: string;
  profileImage?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | 'SUSPENDED';
  joinDate: string;
  currentPlan?: string;
  membershipEndDate?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  features: string[];
  isActive: boolean;
  activeMemberships?: number;
}

export interface MembershipHistory {
  id: string;
  memberId: string;
  planId: string;
  plan: MembershipPlan;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
}

export interface Payment {
  id: string;
  paymentId: string;
  member: {
    id: string;
    memberId: string;
    name: string;
    email: string;
  };
  amount: number;
  paymentMethod: 'CASH' | 'CARD' | 'BANK_TRANSFER' | 'ONLINE';
  paymentDate: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  description?: string;
  invoiceNumber?: string;
}

export interface Staff {
  id: string;
  staffId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  salary?: number;
  joinDate: string;
  isActive: boolean;
  profileImage?: string;
}

export interface Trainer {
  id: string;
  trainerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string[];
  certification: string[];
  experience: number;
  salary?: number;
  joinDate: string;
  isActive: boolean;
  profileImage?: string;
  bio?: string;
}

export interface DashboardSummary {
  members: {
    total: number;
    active: number;
    expired: number;
    inactive: number;
    suspended: number;
    newThisMonth: number;
  };
  expiringMemberships: {
    id: string;
    memberId: string;
    memberName: string;
    email: string;
    phone: string;
    planName: string;
    endDate: string;
    daysRemaining: number;
  }[];
  staff: {
    total: number;
  };
  trainers: {
    total: number;
  };
}

export interface RevenueSummary {
  revenue: {
    today: { amount: number; transactions: number };
    month: { amount: number; transactions: number };
    year: { amount: number; transactions: number };
  };
  recentPayments: {
    id: string;
    paymentId: string;
    memberName: string;
    amount: number;
    method: string;
    date: string;
    status: string;
  }[];
  paymentMethodBreakdown: {
    method: string;
    amount: number;
    count: number;
  }[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
