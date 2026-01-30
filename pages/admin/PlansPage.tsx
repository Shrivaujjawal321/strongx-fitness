import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/admin/Modal';
import StatusBadge from '../../components/admin/StatusBadge';
import { plansApi } from '../../services/api';
import { MembershipPlan, ApiResponse } from '../../types/admin';

const PlansPage: React.FC = () => {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    features: '',
  });

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await plansApi.getAll(true) as ApiResponse<MembershipPlan[]>;
      setPlans(response.data);
    } catch (error) {
      console.error('Failed to fetch plans:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleOpenForm = (plan?: MembershipPlan) => {
    if (plan) {
      setSelectedPlan(plan);
      setFormData({
        name: plan.name,
        description: plan.description || '',
        price: String(plan.price),
        duration: String(plan.duration),
        features: plan.features.join('\n'),
      });
    } else {
      setSelectedPlan(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        duration: '',
        features: '',
      });
    }
    setIsFormOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      name: formData.name,
      description: formData.description || null,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
      features: formData.features.split('\n').filter((f) => f.trim()),
    };

    try {
      if (selectedPlan) {
        await plansApi.update(selectedPlan.id, data);
      } else {
        await plansApi.create(data);
      }
      setIsFormOpen(false);
      fetchPlans();
    } catch (error) {
      console.error('Failed to save plan:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (plan: MembershipPlan) => {
    try {
      await plansApi.update(plan.id, { isActive: !plan.isActive });
      fetchPlans();
    } catch (error) {
      console.error('Failed to toggle plan status:', error);
    }
  };

  const handleDelete = async (plan: MembershipPlan) => {
    if (!confirm(`Are you sure you want to delete the "${plan.name}" plan?`)) {
      return;
    }

    try {
      await plansApi.delete(plan.id);
      fetchPlans();
    } catch (error) {
      console.error('Failed to delete plan:', error);
    }
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-2">
            Management
          </h4>
          <h1 className="font-orbitron text-3xl md:text-4xl font-black text-white uppercase">
            Membership Plans
          </h1>
        </div>
        <button
          onClick={() => handleOpenForm()}
          className="flex items-center gap-2 bg-primary text-dark font-jakarta font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl hover:bg-primary-hover transition-all"
        >
          <Plus size={16} />
          Add Plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-3xl p-6 transition-all ${
              plan.isActive
                ? 'bg-dark-card border border-neutral-border/20 hover:border-primary/30'
                : 'bg-dark-card/50 border border-neutral-border/10 opacity-60'
            }`}
          >
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              <StatusBadge status={plan.isActive ? 'ACTIVE' : 'INACTIVE'} size="sm" />
            </div>

            {/* Plan Info */}
            <div className="mb-6">
              <h3 className="font-orbitron text-xl font-bold text-white uppercase mb-2">
                {plan.name}
              </h3>
              <p className="font-jakarta text-neutral-gray text-sm line-clamp-2">
                {plan.description || 'No description'}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-orbitron text-4xl font-black text-primary">
                ${plan.price}
              </span>
              <span className="font-jakarta text-neutral-gray text-sm">
                / {plan.duration} days
              </span>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-6">
              {plan.features.slice(0, 5).map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-primary" />
                  </div>
                  <span className="font-jakarta text-white text-sm">{feature}</span>
                </li>
              ))}
              {plan.features.length > 5 && (
                <li className="font-jakarta text-neutral-gray text-sm pl-8">
                  +{plan.features.length - 5} more features
                </li>
              )}
            </ul>

            {/* Active Memberships */}
            <p className="font-jakarta text-neutral-gray text-xs mb-4">
              {plan.activeMemberships || 0} active memberships
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenForm(plan)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-neutral-border/30 text-neutral-gray hover:border-primary hover:text-primary transition-all font-jakarta text-sm"
              >
                <Edit size={16} />
                Edit
              </button>
              <button
                onClick={() => handleToggleActive(plan)}
                className={`p-3 rounded-xl border transition-all ${
                  plan.isActive
                    ? 'border-neutral-border/30 text-neutral-gray hover:border-orange-500 hover:text-orange-400'
                    : 'border-green-500/30 text-green-400 hover:border-green-500'
                }`}
                title={plan.isActive ? 'Deactivate' : 'Activate'}
              >
                {plan.isActive ? <X size={16} /> : <Check size={16} />}
              </button>
              <button
                onClick={() => handleDelete(plan)}
                className="p-3 rounded-xl border border-neutral-border/30 text-neutral-gray hover:border-red-500 hover:text-red-400 transition-all"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {plans.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="font-jakarta text-neutral-gray">No membership plans found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedPlan ? 'Edit Plan' : 'Add New Plan'}
        size="lg"
      >
        <form onSubmit={handleSubmitForm} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
                Plan Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Premium"
                className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="79.00"
                className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
              Duration (days) *
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="30"
              className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the plan"
              className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
              Features (one per line)
            </label>
            <textarea
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Access to Gym Equipment&#10;Locker Room Access&#10;Free WiFi"
              rows={5}
              className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all resize-none"
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
              {isSubmitting ? 'Saving...' : selectedPlan ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default PlansPage;
