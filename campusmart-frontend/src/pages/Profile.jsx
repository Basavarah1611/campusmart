import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { User, Save } from 'lucide-react';

export default function Profile() {
  const [form, setForm] = useState({ fullName: '', phone: '', whatsapp: '', instagram: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => { load(); }, []);
  const load = async () => {
    try {
      const res = await authService.getProfile();
      setForm({ fullName: res.data.fullName || '', phone: res.data.phone || '', whatsapp: res.data.whatsapp || '', instagram: res.data.instagram || '' });
    } catch {}
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try { await authService.updateProfile(form); setMsg('Profile updated!'); setTimeout(() => setMsg(''), 3000); } catch { setMsg('Failed to update'); }
    setSaving(false);
  };

  if (loading) return <div className="max-w-lg mx-auto px-4 py-8"><div className="skeleton h-80 w-full"></div></div>;

  return (
    <div className="max-w-lg mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <User size={28} className="text-primary-600" />
        <h1 className="text-3xl font-bold text-surface-900">Profile</h1>
      </div>

      <div className="glass-card p-6">
        {msg && <div className="bg-accent-500/10 text-accent-600 px-4 py-3 rounded-lg text-sm mb-4">{msg}</div>}
        <form onSubmit={handleSave} className="space-y-4">
          <div><label className="block text-sm font-medium text-surface-700 mb-1.5">Full Name</label><input value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} className="input-field" /></div>
          <div><label className="block text-sm font-medium text-surface-700 mb-1.5">Phone</label><input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="input-field" placeholder="+91 ..." /></div>
          <div><label className="block text-sm font-medium text-surface-700 mb-1.5">WhatsApp</label><input value={form.whatsapp} onChange={e => setForm({...form, whatsapp: e.target.value})} className="input-field" /></div>
          <div><label className="block text-sm font-medium text-surface-700 mb-1.5">Instagram</label><input value={form.instagram} onChange={e => setForm({...form, instagram: e.target.value})} className="input-field" placeholder="@handle" /></div>
          <button type="submit" disabled={saving} className="btn-primary w-full py-3 disabled:opacity-50"><Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}</button>
        </form>
      </div>
    </div>
  );
}
