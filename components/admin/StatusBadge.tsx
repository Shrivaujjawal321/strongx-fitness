import React from 'react';

type StatusType =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'EXPIRED'
  | 'SUSPENDED'
  | 'PENDING'
  | 'COMPLETED'
  | 'FAILED'
  | 'REFUNDED'
  | 'CANCELLED';

interface StatusBadgeProps {
  status: StatusType | string;
  size?: 'sm' | 'md';
}

const statusStyles: Record<string, string> = {
  ACTIVE: 'bg-green-500/20 text-green-400 border-green-500/30',
  INACTIVE: 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30',
  EXPIRED: 'bg-red-500/20 text-red-400 border-red-500/30',
  SUSPENDED: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  PENDING: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  COMPLETED: 'bg-green-500/20 text-green-400 border-green-500/30',
  FAILED: 'bg-red-500/20 text-red-400 border-red-500/30',
  REFUNDED: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  CANCELLED: 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const styles = statusStyles[status] || statusStyles.INACTIVE;
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center rounded-full border font-jakarta font-bold uppercase tracking-wider ${styles} ${sizeClasses}`}
    >
      {status.replace('_', ' ')}
    </span>
  );
};

export default StatusBadge;
