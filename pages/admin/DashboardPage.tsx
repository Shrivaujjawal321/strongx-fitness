import React, { useEffect, useState } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Dumbbell,
  UserCog,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatCard from '../../components/admin/StatCard';
import { dashboardApi } from '../../services/api';
import { DashboardSummary, RevenueSummary } from '../../types/admin';

const DashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [revenue, setRevenue] = useState<RevenueSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryData, revenueData] = await Promise.all([
          dashboardApi.getSummary(),
          dashboardApi.getRevenue(),
        ]);
        setSummary(summaryData as DashboardSummary);
        setRevenue(revenueData as RevenueSummary);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-2">
          Overview
        </h4>
        <h1 className="font-orbitron text-3xl md:text-4xl font-black text-white uppercase">
          Dashboard
        </h1>
      </div>

      {/* Expiring Members Alert */}
      {summary && summary.expiringMemberships.length > 0 && (
        <div className="mb-8 bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={24} className="text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-orbitron text-lg font-bold text-white uppercase mb-2">
                Memberships Expiring Soon
              </h3>
              <p className="font-jakarta text-neutral-gray text-sm mb-4">
                {summary.expiringMemberships.length} member(s) have memberships expiring
                within the next 7 days.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {summary.expiringMemberships.slice(0, 3).map((member) => (
                  <div
                    key={member.id}
                    className="bg-dark rounded-xl p-4 border border-neutral-border/20"
                  >
                    <p className="font-jakarta text-white font-medium">
                      {member.memberName}
                    </p>
                    <p className="font-jakarta text-neutral-gray text-xs mt-1">
                      {member.planName}
                    </p>
                    <p className="font-jakarta text-orange-400 text-sm mt-2">
                      Expires in {member.daysRemaining} days
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Member Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Members"
          value={summary?.members.total || 0}
          icon={Users}
          variant="primary"
        />
        <StatCard
          title="Active Members"
          value={summary?.members.active || 0}
          icon={UserCheck}
          trend={{
            value: 12,
            label: 'vs last month',
            isPositive: true,
          }}
        />
        <StatCard
          title="Expired"
          value={summary?.members.expired || 0}
          icon={UserX}
        />
        <StatCard
          title="New This Month"
          value={summary?.members.newThisMonth || 0}
          icon={TrendingUp}
        />
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-dark-card rounded-2xl border border-neutral-border/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <DollarSign size={20} className="text-green-400" />
            </div>
            <div>
              <p className="font-jakarta text-neutral-gray text-xs uppercase tracking-wider">
                Today's Revenue
              </p>
              <p className="font-orbitron text-2xl font-black text-green-400">
                {formatCurrency(revenue?.revenue.today.amount || 0)}
              </p>
            </div>
          </div>
          <p className="font-jakarta text-neutral-gray text-sm">
            {revenue?.revenue.today.transactions || 0} transactions
          </p>
        </div>

        <div className="bg-dark-card rounded-2xl border border-neutral-border/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Calendar size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="font-jakarta text-neutral-gray text-xs uppercase tracking-wider">
                This Month
              </p>
              <p className="font-orbitron text-2xl font-black text-blue-400">
                {formatCurrency(revenue?.revenue.month.amount || 0)}
              </p>
            </div>
          </div>
          <p className="font-jakarta text-neutral-gray text-sm">
            {revenue?.revenue.month.transactions || 0} transactions
          </p>
        </div>

        <div className="bg-dark-card rounded-2xl border border-neutral-border/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <TrendingUp size={20} className="text-purple-400" />
            </div>
            <div>
              <p className="font-jakarta text-neutral-gray text-xs uppercase tracking-wider">
                This Year
              </p>
              <p className="font-orbitron text-2xl font-black text-purple-400">
                {formatCurrency(revenue?.revenue.year.amount || 0)}
              </p>
            </div>
          </div>
          <p className="font-jakarta text-neutral-gray text-sm">
            {revenue?.revenue.year.transactions || 0} transactions
          </p>
        </div>
      </div>

      {/* Staff & Trainers Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <StatCard
          title="Active Staff"
          value={summary?.staff.total || 0}
          icon={UserCog}
        />
        <StatCard
          title="Active Trainers"
          value={summary?.trainers.total || 0}
          icon={Dumbbell}
        />
      </div>

      {/* Recent Payments */}
      <div className="bg-dark-card rounded-2xl border border-neutral-border/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-border/20">
          <h3 className="font-orbitron text-lg font-bold text-white uppercase">
            Recent Payments
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-dark">
                <th className="px-6 py-3 text-left font-grotesk text-primary text-xs font-bold uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left font-grotesk text-primary text-xs font-bold uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left font-grotesk text-primary text-xs font-bold uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left font-grotesk text-primary text-xs font-bold uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left font-grotesk text-primary text-xs font-bold uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {revenue?.recentPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-t border-neutral-border/10 hover:bg-dark/50"
                >
                  <td className="px-6 py-4 font-jakarta text-white text-sm">
                    {payment.paymentId}
                  </td>
                  <td className="px-6 py-4 font-jakarta text-neutral-gray text-sm">
                    {payment.memberName}
                  </td>
                  <td className="px-6 py-4 font-orbitron text-primary font-bold text-sm">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-6 py-4 font-jakarta text-neutral-gray text-sm">
                    {payment.method.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        payment.status === 'COMPLETED'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
              {(!revenue?.recentPayments || revenue.recentPayments.length === 0) && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center font-jakarta text-neutral-gray"
                  >
                    No recent payments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
