import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-orbitron text-4xl font-black text-white mb-2">
            STRONG<span className="text-primary">X</span>
          </h1>
          <p className="font-jakarta text-neutral-gray text-sm uppercase tracking-widest">
            Admin Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-dark-card rounded-3xl border border-neutral-border/20 p-8 shadow-2xl">
          <h2 className="font-orbitron text-2xl font-bold text-white uppercase text-center mb-6">
            Sign In
          </h2>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3">
              <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
              <p className="font-jakarta text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@strongx.com"
                className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block font-jakarta text-neutral-gray text-xs uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full bg-dark border border-neutral-border/30 rounded-xl p-4 text-white font-jakarta text-sm outline-none focus:border-primary transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-dark font-jakarta font-black uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-primary-hover transition-all shadow-[0_0_30px_-10px_#f0dd35] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="font-jakarta text-neutral-gray text-sm hover:text-primary transition-colors"
            >
              Back to Website
            </a>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 text-center">
          <p className="font-jakarta text-neutral-gray text-xs">Demo credentials:</p>
          <p className="font-jakarta text-neutral-gray text-xs mt-1">
            <span className="text-white">admin@strongx.com</span> /{' '}
            <span className="text-white">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
