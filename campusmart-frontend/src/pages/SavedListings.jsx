import { useState, useEffect } from 'react';
import { BookmarkIcon } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import { bookmarkService } from '../services/bookmarkService';

export default function SavedListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);
  const load = async () => {
    try { const res = await bookmarkService.getSavedListings(); setListings(res.data); } catch {}
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <BookmarkIcon size={28} className="text-primary-600" />
        <div>
          <h1 className="text-3xl font-bold text-surface-900">Saved Listings</h1>
          <p className="text-surface-500">{listings.length} saved items</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <div key={i} className="glass-card overflow-hidden"><div className="skeleton h-48 w-full"></div><div className="p-4 space-y-3"><div className="skeleton h-5 w-3/4"></div><div className="skeleton h-6 w-1/3"></div></div></div>)}
        </div>
      ) : listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map(l => <ListingCard key={l.id} listing={l} onBookmarkChange={load} />)}
        </div>
      ) : (
        <div className="text-center py-20"><div className="text-6xl mb-4">❤️</div><h3 className="text-xl font-semibold text-surface-700 mb-2">No saved items</h3><p className="text-surface-500">Bookmark listings to see them here</p></div>
      )}
    </div>
  );
}
