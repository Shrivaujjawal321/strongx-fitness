import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Mail, Phone } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/admin/Modal';
import StatusBadge from '../../components/admin/StatusBadge';
import { staffApi } from '../../services/api';
import { Staff, ApiResponse } from '../../types/admin';

const StaffPage: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    salary: '',
  });

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const response = await staffApi.getAll(true) as ApiResponse<Staff[]>;
      setStaff(response.data);
    } catch (error) {
      console.error('Failed to fetch staff:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleOpenForm = (staffMember?: Staff) => {
    if (staffMember) {
      setSelectedStaff(staffMember);
      setFormData({
        firstName: staffMember.firstName,
        lastName: staffMember.lastName,
        email: staffMember.email,
        phone: staffMember.phone,
        role: staffMember.role,
        salary: staffMember.salary ? String(staffMember.salary) : '',
      });
    } else {
      setSelectedStaff(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: '',
        salary: '',
      });
    }
    setIsFormOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      salary: formData.salary ? parseFloat(formData.salary) : null,
    };

    try {
      if (selectedStaff) {
        await staffApi.update(selectedStaff.id, data);
      } else {
        await staffApi.create(data);
      }
      setIsFormOpen(false);
      fetchStaff();
    } catch (error) {
      console.error('Failed to save staff:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (staffMember: Staff) => {
    if (!confirm(`Are you sure you want to deactivate ${staffMember.firstName} ${staffMember.lastName}?`)) {
      return;
    }

    try {
      await staffApi.delete(staffMember.id);
      fetchStaff();
    } catch (error) {
      console.error('Failed to delete staff:', error);
    }
  };

  const formatCurrency = (amount: number | null | undefined) => {
    if (!amount) return '-';
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-2">
            Management
          </h4>
          <h1 className="font-orbitron text-3xl md:text-4xl font-black text-white uppercase">
            Staff
          </h1>
        </div>
        <button
          onClick={() => handleOpenForm()}
          className="flex items-center gap-2 bg-primary text-dark font-jakarta font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl hover:bg-primary-hover transition-all"
        >
          <Plus size={16} />
          Add Staff
        </button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((staffMember) => (
          <div
            key={staffMember.id}
            className={`bg-dark-card rounded-2xl border p-6 transition-all hover:-translate-y-1 ${
              staffMember.isActive
                ? 'border-neutral-border/20 hover:border-primary/30'
                : 'border-neutral-border/10 opacity-60'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-orbitron text-xl font-bold text-primary">
                    {staffMember.firstName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-orbitron text-lg font-bold text-white">
                    {staffMember.firstName} {staffMember.lastName}
                  </h3>
                  <p className="font-jakarta text-primary text-sm">{staffMember.role}</p>
                </div>
              </div>
              <StatusBadge status={staffMember.isActive ? 'ACTIVE' : 'INACTIVE'} size="sm" />
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-neutral-gray">
                <Mail size={16} />
                <span className="font-jakarta text-sm truncate">{staffMember.email}</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-gray">
                <Phone size={16} />
                <span className="font-jakarta text-sm">{staffMember.phone}</span>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-neutral-border/20">
              <div>
                <p className="font-jakarta text-neutral-gray text-xs uppercase tracking-wider">
                  Staff ID
                </p>
                <p className="font-orbitron text-white font-bold">{staffMember.staffId}</p>
              </div>
              <div>
                <p className="font-jakarta text-neutral-gray text-xs uppercase tracking-wider">
                  Salary
                </p>
                <p className="font-orbitron text-white font-bold">
                  {formatCurrency(staffMember.salary)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenForm(staffMember)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-neutral-border/30 text-neutral-gray hover:border-primary hover:text-primary transition-all font-jakarta text-sm"
              >
                <Edit size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(staffMember)}
                className="p-3 rounded-xl border border-neutral-border/30 text-neutral-gray hover:border-red-500 hover:text-red-400 transition-all"
                title="Deactivate"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {staff.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="font-jakarta text-neutral-gray">No staff members found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedStaff ? 'Edit Staff' : 'Add New Staff'}
        size="lg"
      >
        <form onSubmit={handleSubmitForm} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
                First Name *
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
                Phone *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
                Role *
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g., Front Desk, Manager"
                className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
                Salary ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="3500"
                className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
              />
            </div>
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
              {isSubmitting ? 'Saving...' : selectedStaff ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default StaffPage;
