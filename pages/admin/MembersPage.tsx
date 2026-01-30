import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Eye, Edit, Trash2, UserPlus } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import StatusBadge from '../../components/admin/StatusBadge';
import { membersApi, plansApi } from '../../services/api';
import { Member, MembershipPlan, PaginatedResponse, ApiResponse } from '../../types/admin';

const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
  });
  const [membershipData, setMembershipData] = useState({ planId: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await membersApi.getAll({
        page: pagination.page,
        limit: pagination.limit,
        search: searchValue || undefined,
      }) as PaginatedResponse<Member>;
      setMembers(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to fetch members:', error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, searchValue]);

  const fetchPlans = async () => {
    try {
      const response = await plansApi.getAll() as ApiResponse<MembershipPlan[]>;
      setPlans(response.data);
    } catch (error) {
      console.error('Failed to fetch plans:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchPlans();
  }, [fetchMembers]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleOpenForm = (member?: Member) => {
    if (member) {
      setSelectedMember(member);
      setFormData({
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        phone: member.phone,
        gender: member.gender || '',
        address: member.address || '',
      });
    } else {
      setSelectedMember(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        address: '',
      });
    }
    setIsFormOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (selectedMember) {
        await membersApi.update(selectedMember.id, formData);
      } else {
        await membersApi.create(formData);
      }
      setIsFormOpen(false);
      fetchMembers();
    } catch (error) {
      console.error('Failed to save member:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (member: Member) => {
    if (!confirm(`Are you sure you want to deactivate ${member.firstName} ${member.lastName}?`)) {
      return;
    }

    try {
      await membersApi.delete(member.id);
      fetchMembers();
    } catch (error) {
      console.error('Failed to delete member:', error);
    }
  };

  const handleAddMembership = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember || !membershipData.planId) return;

    setIsSubmitting(true);
    try {
      await membersApi.addMembership(selectedMember.id, membershipData);
      setIsMembershipOpen(false);
      fetchMembers();
    } catch (error) {
      console.error('Failed to add membership:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      key: 'memberId',
      header: 'Member ID',
      render: (member: Member) => (
        <span className="font-orbitron text-primary font-bold">{member.memberId}</span>
      ),
    },
    {
      key: 'name',
      header: 'Name',
      render: (member: Member) => (
        <div>
          <p className="text-white font-medium">
            {member.firstName} {member.lastName}
          </p>
          <p className="text-neutral-gray text-xs">{member.email}</p>
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (member: Member) => (
        <span className="text-neutral-gray">{member.phone}</span>
      ),
    },
    {
      key: 'currentPlan',
      header: 'Plan',
      render: (member: Member) => (
        <span className="text-neutral-gray">
          {member.currentPlan || '-'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (member: Member) => <StatusBadge status={member.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (member: Member) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedMember(member);
              setIsViewOpen(true);
            }}
            className="p-2 rounded-lg text-neutral-gray hover:text-primary hover:bg-dark transition-all"
            title="View"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleOpenForm(member)}
            className="p-2 rounded-lg text-neutral-gray hover:text-primary hover:bg-dark transition-all"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => {
              setSelectedMember(member);
              setMembershipData({ planId: '' });
              setIsMembershipOpen(true);
            }}
            className="p-2 rounded-lg text-neutral-gray hover:text-green-400 hover:bg-dark transition-all"
            title="Add Membership"
          >
            <UserPlus size={16} />
          </button>
          <button
            onClick={() => handleDelete(member)}
            className="p-2 rounded-lg text-neutral-gray hover:text-red-400 hover:bg-dark transition-all"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h4 className="font-grotesk text-primary text-sm font-bold uppercase tracking-[0.3em] mb-2">
          Management
        </h4>
        <h1 className="font-orbitron text-3xl md:text-4xl font-black text-white uppercase">
          Members
        </h1>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={members}
        loading={loading}
        searchValue={searchValue}
        onSearchChange={handleSearch}
        searchPlaceholder="Search members..."
        pagination={pagination}
        onPageChange={handlePageChange}
        emptyMessage="No members found"
        actions={
          <button
            onClick={() => handleOpenForm()}
            className="flex items-center gap-2 bg-primary text-dark font-jakarta font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl hover:bg-primary-hover transition-all"
          >
            <Plus size={16} />
            Add Member
          </button>
        }
      />

      {/* Add/Edit Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedMember ? 'Edit Member' : 'Add New Member'}
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
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
              {isSubmitting ? 'Saving...' : selectedMember ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Member Modal */}
      <Modal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        title="Member Details"
        size="lg"
      >
        {selectedMember && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-orbitron text-2xl font-bold text-primary">
                  {selectedMember.firstName.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-bold text-white">
                  {selectedMember.firstName} {selectedMember.lastName}
                </h3>
                <p className="font-jakarta text-primary text-sm">{selectedMember.memberId}</p>
              </div>
              <StatusBadge status={selectedMember.status} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark rounded-xl p-4">
                <p className="font-jakarta text-neutral-gray text-xs uppercase tracking-wider mb-1">
                  Email
                </p>
                <p className="font-jakarta text-white">{selectedMember.email}</p>
              </div>
              <div className="bg-dark rounded-xl p-4">
                <p className="font-jakarta text-neutral-gray text-xs uppercase tracking-wider mb-1">
                  Phone
                </p>
                <p className="font-jakarta text-white">{selectedMember.phone}</p>
              </div>
              <div className="bg-dark rounded-xl p-4">
                <p className="font-jakarta text-neutral-gray text-xs uppercase tracking-wider mb-1">
                  Current Plan
                </p>
                <p className="font-jakarta text-white">{selectedMember.currentPlan || 'No active plan'}</p>
              </div>
              <div className="bg-dark rounded-xl p-4">
                <p className="font-jakarta text-neutral-gray text-xs uppercase tracking-wider mb-1">
                  Join Date
                </p>
                <p className="font-jakarta text-white">
                  {new Date(selectedMember.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Membership Modal */}
      <Modal
        isOpen={isMembershipOpen}
        onClose={() => setIsMembershipOpen(false)}
        title="Add Membership"
      >
        <form onSubmit={handleAddMembership} className="space-y-6">
          <p className="font-jakarta text-neutral-gray">
            Add a membership plan for{' '}
            <span className="text-white font-medium">
              {selectedMember?.firstName} {selectedMember?.lastName}
            </span>
          </p>

          <div>
            <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
              Select Plan *
            </label>
            <select
              required
              value={membershipData.planId}
              onChange={(e) => setMembershipData({ planId: e.target.value })}
              className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
            >
              <option value="">Choose a plan</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} - ${plan.price} ({plan.duration} days)
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setIsMembershipOpen(false)}
              className="px-6 py-3 rounded-xl border border-neutral-border/30 text-neutral-gray hover:border-white hover:text-white transition-all font-jakarta text-sm uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-primary text-dark font-jakarta font-bold text-sm uppercase tracking-widest hover:bg-primary-hover transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Adding...' : 'Add Membership'}
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default MembersPage;
