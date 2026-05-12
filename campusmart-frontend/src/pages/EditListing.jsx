import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listingService } from '../services/listingService';
import { categories } from '../components/CategoryCard';

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '', contactEmail: '', contactPhone: '', contactWhatsapp: '', contactInstagram: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { load(); }, [id]);
  const load = async () => {
    try {
      const res = await listingService.getListingById(id);
      const d = res.data;
      setForm({ title: d.title, description: d.description || '', price: d.price || '', category: d.category, contactEmail: d.contactEmail || '', contactPhone: d.contactPhone || '', contactWhatsapp: d.contactWhatsapp || '', contactInstagram: d.contactInstagram || '' });
    } catch { navigate('/dashboard'); }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await listingService.updateListing(id, { ...form, price: parseFloat(form.price) || 0 });
      navigate(`/listings/${id}`);
    } catch (err) { setError(err.response?.data?.message || 'Failed to update'); }
    setSaving(false);
  };

  if (loading) return <div className="max-w-2xl mx-auto px-4 py-8"><div className="skeleton h-96 w-full"></div></div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-surface-900 mb-8">Edit Listing</h1>
      <div className="glass-card p-6">
        {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="block text-sm font-medium text-surface-700 mb-1.5">Title</label><input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-field" /></div>
          <div><label className="block text-sm font-medium text-surface-700 mb-1.5">Category</label>
            <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field">
              {categories.map(c => <option key={c.key} value={c.key}>{c.emoji} {c.label}</option>)}
            </select>
          </div>
          <div><label className="block text-sm font-medium text-surface-700 mb-1.5">Price (₹)</label><input type="number" min="0" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="input-field" /></div>
          <div><label className="block text-sm font-medium text-surface-700 mb-1.5">Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-field" rows={4} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs font-medium text-surface-600 mb-1">Email</label><input value={form.contactEmail} onChange={e => setForm({...form, contactEmail: e.target.value})} className="input-field" /></div>
            <div><label className="block text-xs font-medium text-surface-600 mb-1">Phone</label><input value={form.contactPhone} onChange={e => setForm({...form, contactPhone: e.target.value})} className="input-field" /></div>
            <div><label className="block text-xs font-medium text-surface-600 mb-1">WhatsApp</label><input value={form.contactWhatsapp} onChange={e => setForm({...form, contactWhatsapp: e.target.value})} className="input-field" /></div>
            <div><label className="block text-xs font-medium text-surface-600 mb-1">Instagram</label><input value={form.contactInstagram} onChange={e => setForm({...form, contactInstagram: e.target.value})} className="input-field" /></div>
          </div>
          <button type="submit" disabled={saving} className="btn-primary w-full py-3 disabled:opacity-50">{saving ? 'Saving...' : 'Save Changes'}</button>
        </form>
      </div>
    </div>
  );
}
