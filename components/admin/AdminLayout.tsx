import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  ClipboardList,
  UserCog,
  Dumbbell,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/admin/members', icon: Users, label: 'Members' },
  { path: '/admin/plans', icon: ClipboardList, label: 'Plans' },
  { path: '/admin/payments', icon: CreditCard, label: 'Payments' },
  { path: '/admin/staff', icon: UserCog, label: 'Staff' },
  { path: '/admin/trainers', icon: Dumbbell, label: 'Trainers' },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-dark-card border-b border-neutral-border/20 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/admin" className="font-orbitron text-xl font-black text-white">
            STRONG<span className="text-primary">X</span>
            <span className="text-xs font-jakarta font-normal text-neutral-gray ml-2">ADMIN</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white p-2"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-dark-card border-r border-neutral-border/20 z-40 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-neutral-border/20">
          <Link to="/admin" className="font-orbitron text-xl font-black text-white">
            STRONG<span className="text-primary">X</span>
            <span className="text-xs font-jakarta font-normal text-neutral-gray ml-2">ADMIN</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="py-6 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-jakarta text-sm transition-all ${
                      active
                        ? 'bg-primary text-dark font-bold'
                        : 'text-neutral-gray hover:bg-dark hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                    {active && <ChevronRight size={16} className="ml-auto" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-border/20">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-orbitron font-bold text-primary">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-jakarta text-white text-sm font-medium truncate">
                {user?.name}
              </p>
              <p className="font-jakarta text-neutral-gray text-xs truncate">
                {user?.role.replace('_', ' ')}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-neutral-border/30 text-neutral-gray hover:border-red-500 hover:text-red-500 transition-all font-jakarta text-sm"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
