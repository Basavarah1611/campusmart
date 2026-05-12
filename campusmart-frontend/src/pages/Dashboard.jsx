import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Package, Edit, Trash2 } from 'lucide-react';
import { listingService } from '../services/listingService';
import { useAuth } from '../context/AuthContext';

const catLabels = { NOTES:'Notes', USED_ITEMS:'Used Items', ELECTRONICS:'Electronics', BOOKS:'Books', ROOMMATES:'Roommates', EVENT_TICKETS:'Event Tickets' };

export default function Dashboard() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { const res = await listingService.getMyListings(); setListings(res.data); } catch {}
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this listing?')) return;
    await listingService.deleteListing(id);
    setListings(prev => prev.filter(l => l.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-surface-900">Dashboard</h1>
          <p className="text-surface-500">Welcome, {user?.fullName}</p>
        </div>
        <Link to="/create-listing" className="btn-primary no-underline"><PlusCircle size={18} /> New Listing</Link>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <Package size={20} className="text-primary-600" />
          <h2 className="text-xl font-semibold text-surface-800">My Listings ({listings.length})</h2>
        </div>

        {loading ? (
          <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-20 w-full"></div>)}</div>
        ) : listings.length > 0 ? (
          <div className="space-y-3">
            {listings.map(l => (
              <div key={l.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface-50 hover:bg-surface-100 transition-colors">
                <img src={l.imageUrls?.[0] || `https://ui-avatars.com/api/?name=${l.title}&size=80&background=e0e7ff&color=4f46e5`} alt="" className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <Link to={`/listings/${l.id}`} className="font-semibold text-surface-800 hover:text-primary-600 no-underline truncate block">{l.title}</Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="badge badge-primary text-xs">{catLabels[l.category]}</span>
                    <span className={`badge text-xs ${l.status === 'ACTIVE' ? 'badge-accent' : 'badge-warning'}`}>{l.status}</span>
                    <span className="text-sm font-medium text-primary-600">₹{l.price}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/edit-listing/${l.id}`} className="p-2 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors no-underline"><Edit size={16} /></Link>
                  <button onClick={() => handleDelete(l.id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors border-none cursor-pointer"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-surface-500 mb-4">You haven't listed anything yet</p>
            <Link to="/create-listing" className="btn-primary no-underline">Create Your First Listing</Link>
          </div>
        )}
      </div>
    </div>
  );
}
