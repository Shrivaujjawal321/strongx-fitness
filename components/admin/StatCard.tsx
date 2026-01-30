import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  variant?: 'default' | 'primary';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  variant = 'default',
}) => {
  return (
    <div
      className={`rounded-2xl p-6 border transition-all hover:-translate-y-1 ${
        variant === 'primary'
          ? 'bg-primary/10 border-primary/30'
          : 'bg-dark-card border-neutral-border/20'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            variant === 'primary' ? 'bg-primary/20' : 'bg-dark'
          }`}
        >
          <Icon
            size={24}
            className={variant === 'primary' ? 'text-primary' : 'text-neutral-gray'}
          />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs font-jakarta ${
              trend.isPositive !== false ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {trend.isPositive !== false ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            <span>{trend.value}%</span>
          </div>
        )}
      </div>

      <p className="font-jakarta text-neutral-gray text-sm uppercase tracking-wider mb-1">
        {title}
      </p>
      <p
        className={`font-orbitron text-3xl font-black ${
          variant === 'primary' ? 'text-primary' : 'text-white'
        }`}
      >
        {value}
      </p>

      {trend && (
        <p className="font-jakarta text-neutral-gray text-xs mt-2">{trend.label}</p>
      )}
    </div>
  );
};

export default StatCard;
