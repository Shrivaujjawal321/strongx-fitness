import React, { useEffect, useState, useCallback } from 'react';
import { Plus, FileText, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import StatusBadge from '../../components/admin/StatusBadge';
import { paymentsApi, membersApi, plansApi } from '../../services/api';
import { Payment, Member, MembershipPlan, PaginatedResponse, ApiResponse } from '../../types/admin';

const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    memberId: '',
    amount: '',
    paymentMethod: 'CASH',
    description: '',
    planId: '',
  });

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await paymentsApi.getAll({
        page: pagination.page,
        limit: pagination.limit,
      }) as PaginatedResponse<Payment>;
      setPayments(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit]);

  const fetchMembers = async () => {
    try {
      const response = await membersApi.getAll({ limit: 100 }) as PaginatedResponse<Member>;
      setMembers(response.data);
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await plansApi.getAll() as ApiResponse<MembershipPlan[]>;
      setPlans(response.data);
    } catch (error) {
      console.error('Failed to fetch plans:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
    fetchMembers();
    fetchPlans();
  }, [fetchPayments]);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleOpenForm = () => {
    setFormData({
      memberId: '',
      amount: '',
      paymentMethod: 'CASH',
      description: '',
      planId: '',
    });
    setIsFormOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      memberId: formData.memberId,
      amount: parseFloat(formData.amount),
      paymentMethod: formData.paymentMethod,
      description: formData.description || null,
      planId: formData.planId || undefined,
    };

    try {
      await paymentsApi.create(data);
      setIsFormOpen(false);
      fetchPayments();
    } catch (error) {
      console.error('Failed to create payment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRefund = async (payment: Payment) => {
    if (!confirm(`Are you sure you want to refund payment ${payment.paymentId}?`)) {
      return;
    }

    try {
      await paymentsApi.refund(payment.id);
      fetchPayments();
    } catch (error) {
      console.error('Failed to refund payment:', error);
    }
  };

  const handleDownloadInvoice = async (payment: Payment) => {
    if (!payment.invoiceNumber) {
      alert('No invoice available for this payment');
      return;
    }

    try {
      // Find the invoice ID from the payment
      const paymentDetails = await paymentsApi.getById(payment.id) as any;
      if (paymentDetails.data?.invoice?.id) {
        const blob = await paymentsApi.getInvoicePdf(paymentDetails.data.invoice.id);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${payment.invoiceNumber}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Failed to download invoice:', error);
      alert('Failed to download invoice');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const columns = [
    {
      key: 'paymentId',
      header: 'Payment ID',
      render: (payment: Payment) => (
        <span className="font-orbitron text-primary font-bold">{payment.paymentId}</span>
      ),
    },
    {
      key: 'member',
      header: 'Member',
      render: (payment: Payment) => (
        <div>
          <p className="text-white font-medium">{payment.member.name}</p>
          <p className="text-neutral-gray text-xs">{payment.member.memberId}</p>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (payment: Payment) => (
        <span className="font-orbitron text-white font-bold">
          {formatCurrency(payment.amount)}
        </span>
      ),
    },
    {
      key: 'paymentMethod',
      header: 'Method',
      render: (payment: Payment) => (
        <span className="text-neutral-gray capitalize">
          {payment.paymentMethod.replace('_', ' ').toLowerCase()}
        </span>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      render: (payment: Payment) => (
        <span className="text-neutral-gray">
          {new Date(payment.paymentDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (payment: Payment) => <StatusBadge status={payment.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (payment: Payment) => (
        <div className="flex items-center gap-2">
          {payment.invoiceNumber && (
            <button
              onClick={() => handleDownloadInvoice(payment)}
              className="p-2 rounded-lg text-neutral-gray hover:text-primary hover:bg-dark transition-all"
              title="Download Invoice"
            >
              <FileText size={16} />
            </button>
          )}
          {payment.status === 'COMPLETED' && (
            <button
              onClick={() => handleRefund(payment)}
              className="p-2 rounded-lg text-neutral-gray hover:text-orange-400 hover:bg-dark transition-all"
              title="Refund"
            >
              <RefreshCw size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

  // Auto-fill amount when plan is selected
  const handlePlanChange = (planId: string) => {
    setFormData((prev) => {
      const plan = plans.find((p) => p.id === planId);
      return {
        ...prev,
        planId,
        amount: plan ? String(plan.price) : prev.amount,
        description: plan ? `${plan.name} membership payment` : prev.description,
      };
    });
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-2">
          Management
        </h4>
        <h1 className="font-orbitron text-3xl md:text-4xl font-black text-white uppercase">
          Payments
        </h1>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={payments}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        emptyMessage="No payments found"
        actions={
          <button
            onClick={handleOpenForm}
            className="flex items-center gap-2 bg-primary text-dark font-jakarta font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl hover:bg-primary-hover transition-all"
          >
            <Plus size={16} />
            Record Payment
          </button>
        }
      />

      {/* Add Payment Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Record Payment"
        size="lg"
      >
        <form onSubmit={handleSubmitForm} className="space-y-6">
          <div>
            <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
              Member *
            </label>
            <select
              required
              value={formData.memberId}
              onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
              className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
            >
              <option value="">Select a member</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.firstName} {member.lastName} ({member.memberId})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
              Membership Plan (optional)
            </label>
            <select
              value={formData.planId}
              onChange={(e) => handlePlanChange(e.target.value)}
              className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
            >
              <option value="">No plan (custom payment)</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} - ${plan.price} ({plan.duration} days)
                </option>
              ))}
            </select>
            <p className="font-jakarta text-neutral-gray text-xs mt-2">
              Selecting a plan will automatically assign the membership to the member
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
                Amount ($) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="79.00"
                className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
                Payment Method *
              </label>
              <select
                required
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
              >
                <option value="CASH">Cash</option>
                <option value="CARD">Card</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="ONLINE">Online</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Payment description"
              className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-6 py-3 rounded-xl border border-neutral-border/30 text-neutral-gray hover:border-white hover:text-white transition-all font-jakarta text-sm uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-primary text-dark font-jakarta font-bold text-sm uppercase tracking-widest hover:bg-primary-hover transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Record Payment'}
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default PaymentsPage;
