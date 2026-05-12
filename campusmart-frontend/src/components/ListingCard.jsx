import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, IndianRupee } from 'lucide-react';
import { useState } from 'react';
import { bookmarkService } from '../services/bookmarkService';
import { useAuth } from '../context/AuthContext';

const categoryColors = {
  NOTES: 'bg-blue-100 text-blue-700',
  USED_ITEMS: 'bg-amber-100 text-amber-700',
  ELECTRONICS: 'bg-purple-100 text-purple-700',
  BOOKS: 'bg-green-100 text-green-700',
  ROOMMATES: 'bg-pink-100 text-pink-700',
  EVENT_TICKETS: 'bg-orange-100 text-orange-700',
};

const categoryLabels = {
  NOTES: 'Notes',
  USED_ITEMS: 'Used Items',
  ELECTRONICS: 'Electronics',
  BOOKS: 'Books',
  ROOMMATES: 'Roommates',
  EVENT_TICKETS: 'Event Tickets',
};

export default function ListingCard({ listing, onBookmarkChange }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(listing.bookmarked);
  const [saving, setSaving] = useState(false);

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user || saving) return;
    setSaving(true);
    try {
      await bookmarkService.toggleBookmark(listing.id);
      setSaved(!saved);
      onBookmarkChange?.();
    } catch (err) {
      console.error('Bookmark error:', err);
    }
    setSaving(false);
  };

  const imageUrl = listing.imageUrls?.[0] || `https://ui-avatars.com/api/?name=${encodeURIComponent(listing.title)}&size=400&background=e0e7ff&color=4f46e5&font-size=0.33&bold=true`;

  return (
    <Link to={`/listings/${listing.id}`} className="no-underline group">
      <div className="glass-card overflow-hidden">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className={`badge ${categoryColors[listing.category] || 'badge-primary'}`}>
              {categoryLabels[listing.category] || listing.category}
            </span>
          </div>
          {user && (
            <button
              onClick={handleBookmark}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center border-none cursor-pointer hover:bg-white transition-colors shadow-sm"
            >
              {saved ? (
                <BookmarkCheck size={16} className="text-primary-600" />
              ) : (
                <Bookmark size={16} className="text-surface-500" />
              )}
            </button>
          )}
          {listing.status === 'SOLD' && (
            <div className="absolute inset-0 bg-surface-900/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg bg-red-500 px-4 py-1 rounded-full">SOLD</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-surface-800 mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {listing.title}
          </h3>
          <p className="text-surface-500 text-sm line-clamp-2 mb-3">
            {listing.description || 'No description provided'}
          </p>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-0.5 text-lg font-bold text-primary-600">
              <IndianRupee size={16} />
              {listing.price > 0 ? listing.price.toLocaleString() : 'Free'}
            </span>
            <span className="text-xs text-surface-400">
              {listing.seller?.fullName}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
