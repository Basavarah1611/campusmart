import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listingService } from '../services/listingService';
import { Upload, X } from 'lucide-react';
import { categories } from '../components/CategoryCard';

export default function CreateListing() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '', contactEmail: '', contactPhone: '', contactWhatsapp: '', contactInstagram: '' });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = (e) => {
    const newFiles = Array.from(e.target.files).slice(0, 5);
    setFiles(prev => [...prev, ...newFiles].slice(0, 5));
  };

  const removeFile = (i) => setFiles(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = { ...form, price: parseFloat(form.price) || 0 };
      const res = await listingService.createListing(data);
      if (files.length > 0) {
        const fd = new FormData();
        files.forEach(f => fd.append('files', f));
        await listingService.uploadImages(res.data.id, fd);
      }
      navigate(`/listings/${res.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create listing');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-surface-900 mb-2">Create Listing</h1>
      <p className="text-surface-500 mb-8">List your item for fellow students</p>

      <div className="glass-card p-6">
        {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-6 border border-red-100">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Title *</label>
            <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-field" placeholder="What are you selling?" />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Category *</label>
            <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field">
              <option value="">Select category</option>
              {categories.map(c => <option key={c.key} value={c.key}>{c.emoji} {c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Price (₹)</label>
            <input type="number" min="0" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="input-field" placeholder="0 for free" />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-field" rows={4} placeholder="Describe your item..." />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Images (up to 5)</label>
            <div className="flex flex-wrap gap-3">
              {files.map((f, i) => (
                <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-surface-200">
                  <img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeFile(i)} className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-none cursor-pointer"><X size={12} className="text-white" /></button>
                </div>
              ))}
              {files.length < 5 && (
                <label className="w-20 h-20 border-2 border-dashed border-surface-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary-400 transition-colors">
                  <Upload size={20} className="text-surface-400" />
                  <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-surface-200 pt-5">
            <h3 className="font-semibold text-surface-800 mb-3">Contact Info</h3>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs font-medium text-surface-600 mb-1">Email</label><input value={form.contactEmail} onChange={e => setForm({...form, contactEmail: e.target.value})} className="input-field" placeholder="Email" /></div>
              <div><label className="block text-xs font-medium text-surface-600 mb-1">Phone</label><input value={form.contactPhone} onChange={e => setForm({...form, contactPhone: e.target.value})} className="input-field" placeholder="Phone" /></div>
              <div><label className="block text-xs font-medium text-surface-600 mb-1">WhatsApp</label><input value={form.contactWhatsapp} onChange={e => setForm({...form, contactWhatsapp: e.target.value})} className="input-field" placeholder="WhatsApp" /></div>
              <div><label className="block text-xs font-medium text-surface-600 mb-1">Instagram</label><input value={form.contactInstagram} onChange={e => setForm({...form, contactInstagram: e.target.value})} className="input-field" placeholder="@handle" /></div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}
