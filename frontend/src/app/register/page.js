'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Container from '@/components/ui/Container';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 min-h-screen flex items-center">
      <Container className="max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 border border-veloura-sand"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-veloura-dark mb-2">Create Account</h1>
            <p className="text-veloura-muted text-sm">Join the Veloura experience</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 text-sm mb-6 text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-veloura-muted mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full border border-veloura-sand px-4 py-3 focus:outline-none focus:border-veloura-gold transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-veloura-muted mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full border border-veloura-sand px-4 py-3 focus:outline-none focus:border-veloura-gold transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-veloura-muted mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  className="w-full border border-veloura-sand px-4 py-3 pr-12 focus:outline-none focus:border-veloura-gold transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-veloura-muted"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-veloura-muted mb-1">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="w-full border border-veloura-sand px-4 py-3 focus:outline-none focus:border-veloura-gold transition-colors"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-veloura-muted mt-6">
            Already have an account?{' '}
            <Link href="/register" className="text-veloura-gold hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </Container>
    </div>
  );
}