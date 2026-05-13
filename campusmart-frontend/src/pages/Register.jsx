import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { Mail, Lock, Eye, EyeOff, User, Phone, ShoppingBag } from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', confirmPassword: '',
    phone: '', whatsapp: '', instagram: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!form.email.endsWith('@cityengineeringcollege.ac.in')) {
      setError('Only @cityengineeringcollege.ac.in emails are allowed');
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...data } = form;
      const res = await authService.register(data);
      login(res.data);
      navigate('/dashboard');
    } catch (err) {
      const errData = err.response?.data;
      if (typeof errData === 'object' && !errData.message) {
        setError(Object.values(errData).join('. '));
      } else {
        setError(errData?.message || 'Registration failed. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16 animate-fade-in-up">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/30 transform transition hover:scale-105">
            <ShoppingBag size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-surface-900 mb-2">Create Account</h1>
          <p className="text-surface-500 font-medium">Join your campus marketplace</p>
        </div>

        <div className="glass-card p-8 md:p-10">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 border border-red-100 flex items-center gap-2">
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="input-group">
              <label className="input-label">Full Name *</label>
              <div className="input-wrapper">
                <div className="input-icon-left">
                  <User size={18} />
                </div>
                <input
                  type="text" required value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="input-field" placeholder="John Doe"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">College Email *</label>
              <div className="input-wrapper">
                <div className="input-icon-left">
                  <Mail size={18} />
                </div>
                <input
                  type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field" placeholder="you@cityengineeringcollege.ac.in"
                />
              </div>
              <p className="text-xs text-surface-400 mt-1 pl-1">Only @cityengineeringcollege.ac.in emails accepted</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="input-group">
                <label className="input-label">Password *</label>
                <div className="input-wrapper">
                  <div className="input-icon-left">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'} required minLength={6}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="input-field" placeholder="Min 6 chars"
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label className="input-label">Confirm *</label>
                <div className="input-wrapper">
                  <div className="input-icon-left">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'} required
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="input-field" placeholder="Confirm"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="input-icon-right">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="input-group pt-2 border-t border-surface-200/50">
              <label className="input-label">Phone (optional)</label>
              <div className="input-wrapper">
                <div className="input-icon-left">
                  <Phone size={18} />
                </div>
                <input
                  type="tel" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-field" placeholder="+91 9876543210"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="input-group">
                <label className="input-label">WhatsApp</label>
                <div className="input-wrapper">
                  <div className="input-icon-left">
                    <Phone size={18} />
                  </div>
                  <input
                    type="text" value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    className="input-field" placeholder="WhatsApp #"
                  />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Instagram</label>
                <div className="input-wrapper">
                  <div className="input-icon-left">
                    <User size={18} />
                  </div>
                  <input
                    type="text" value={form.instagram}
                    onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                    className="input-field" placeholder="@handle"
                  />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 mt-4 disabled:opacity-70">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-surface-200/50 text-center">
            <p className="text-sm text-surface-500 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-gradient font-bold hover:opacity-80 transition-opacity no-underline ml-1">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
