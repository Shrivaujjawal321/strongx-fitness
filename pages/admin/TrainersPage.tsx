import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Mail, Phone, Award, Clock } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import Modal from '../../components/admin/Modal';
import StatusBadge from '../../components/admin/StatusBadge';
import { trainersApi } from '../../services/api';
import { Trainer, ApiResponse } from '../../types/admin';

const TrainersPage: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    certification: '',
    experience: '',
    salary: '',
    bio: '',
  });

  const fetchTrainers = async () => {
    setLoading(true);
    try {
      const response = await trainersApi.getAll(true) as ApiResponse<Trainer[]>;
      setTrainers(response.data);
    } catch (error) {
      console.error('Failed to fetch trainers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleOpenForm = (trainer?: Trainer) => {
    if (trainer) {
      setSelectedTrainer(trainer);
      setFormData({
        firstName: trainer.firstName,
        lastName: trainer.lastName,
        email: trainer.email,
        phone: trainer.phone,
        specialization: trainer.specialization.join(', '),
        certification: trainer.certification.join(', '),
        experience: String(trainer.experience),
        salary: trainer.salary ? String(trainer.salary) : '',
        bio: trainer.bio || '',
      });
    } else {
      setSelectedTrainer(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialization: '',
        certification: '',
        experience: '',
        salary: '',
        bio: '',
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
      specialization: formData.specialization.split(',').map((s) => s.trim()).filter(Boolean),
      certification: formData.certification.split(',').map((c) => c.trim()).filter(Boolean),
      experience: parseInt(formData.experience) || 0,
      salary: formData.salary ? parseFloat(formData.salary) : null,
      bio: formData.bio || null,
    };

    try {
      if (selectedTrainer) {
        await trainersApi.update(selectedTrainer.id, data);
      } else {
        await trainersApi.create(data);
      }
      setIsFormOpen(false);
      fetchTrainers();
    } catch (error) {
      console.error('Failed to save trainer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (trainer: Trainer) => {
    if (!confirm(`Are you sure you want to deactivate ${trainer.firstName} ${trainer.lastName}?`)) {
      return;
    }

    try {
      await trainersApi.delete(trainer.id);
      fetchTrainers();
    } catch (error) {
      console.error('Failed to delete trainer:', error);
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
            Trainers
          </h1>
        </div>
        <button
          onClick={() => handleOpenForm()}
          className="flex items-center gap-2 bg-primary text-dark font-jakarta font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl hover:bg-primary-hover transition-all"
        >
          <Plus size={16} />
          Add Trainer
        </button>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className={`bg-dark-card rounded-2xl border overflow-hidden transition-all hover:-translate-y-1 ${
              trainer.isActive
                ? 'border-neutral-border/20 hover:border-primary/30'
                : 'border-neutral-border/10 opacity-60'
            }`}
          >
            {/* Image/Header Area */}
            <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 relative">
              <div className="absolute -bottom-8 left-6">
                <div className="w-20 h-20 rounded-full bg-dark-card border-4 border-dark-card flex items-center justify-center">
                  <span className="font-orbitron text-2xl font-bold text-primary">
                    {trainer.firstName.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <StatusBadge status={trainer.isActive ? 'ACTIVE' : 'INACTIVE'} size="sm" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-12">
              <h3 className="font-orbitron text-xl font-bold text-white">
                {trainer.firstName} {trainer.lastName}
              </h3>
              <p className="font-jakarta text-primary text-sm mb-4">{trainer.trainerId}</p>

              {/* Specializations */}
              <div className="flex flex-wrap gap-2 mb-4">
                {trainer.specialization.slice(0, 3).map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-dark rounded-lg font-jakarta text-xs text-neutral-gray"
                  >
                    {spec}
                  </span>
                ))}
                {trainer.specialization.length > 3 && (
                  <span className="px-2 py-1 font-jakarta text-xs text-neutral-gray">
                    +{trainer.specialization.length - 3}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 text-neutral-gray">
                  <Clock size={14} />
                  <span className="font-jakarta text-sm">{trainer.experience} years experience</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-gray">
                  <Award size={14} />
                  <span className="font-jakarta text-sm truncate">
                    {trainer.certification[0] || 'No certifications'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-neutral-gray">
                  <Mail size={14} />
                  <span className="font-jakarta text-sm truncate">{trainer.email}</span>
                </div>
              </div>

              {/* Salary */}
              <div className="pt-4 border-t border-neutral-border/20 mb-4">
                <p className="font-jakarta text-neutral-gray text-xs uppercase tracking-wider">
                  Salary
                </p>
                <p className="font-orbitron text-white font-bold">
                  {formatCurrency(trainer.salary)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenForm(trainer)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-neutral-border/30 text-neutral-gray hover:border-primary hover:text-primary transition-all font-jakarta text-sm"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(trainer)}
                  className="p-3 rounded-xl border border-neutral-border/30 text-neutral-gray hover:border-red-500 hover:text-red-400 transition-all"
                  title="Deactivate"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {trainers.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="font-jakarta text-neutral-gray">No trainers found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedTrainer ? 'Edit Trainer' : 'Add New Trainer'}
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
                Experience (years) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
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
                className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
              Specializations (comma-separated)
            </label>
            <input
              type="text"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              placeholder="Strength Training, HIIT, Yoga"
              className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
              Certifications (comma-separated)
            </label>
            <input
              type="text"
              value={formData.certification}
              onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
              placeholder="NASM-CPT, CrossFit Level 2"
              className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              placeholder="Brief biography..."
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
              {isSubmitting ? 'Saving...' : selectedTrainer ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default TrainersPage;
