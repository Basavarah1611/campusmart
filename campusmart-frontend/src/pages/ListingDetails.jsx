import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MessageCircle, Bookmark, BookmarkCheck, Flag, IndianRupee, User } from 'lucide-react';
import { listingService } from '../services/listingService';
import { bookmarkService } from '../services/bookmarkService';
import { reportService } from '../services/reportService';
import { useAuth } from '../context/AuthContext';

const catLabels = { NOTES:'Notes', USED_ITEMS:'Used Items', ELECTRONICS:'Electronics', BOOKS:'Books', ROOMMATES:'Roommates', EVENT_TICKETS:'Event Tickets' };

export default function ListingDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportForm, setReportForm] = useState({ reason: '', description: '' });
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => { load(); }, [id]);

  const load = async () => {
    try {
      const res = await listingService.getListingById(id);
      setListing(res.data);
      setSaved(res.data.bookmarked);
    } catch { navigate('/browse'); }
    setLoading(false);
  };

  const toggleBookmark = async () => {
    if (!user) return navigate('/login');
    await bookmarkService.toggleBookmark(id);
    setSaved(!saved);
  };

  const submitReport = async (e) => {
    e.preventDefault();
    await reportService.createReport({ listingId: id, ...reportForm });
    setShowReport(false);
    alert('Report submitted!');
  };

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-12"><div className="skeleton h-96 w-full mb-6"></div><div className="skeleton h-8 w-1/2 mb-4"></div><div className="skeleton h-4 w-full"></div></div>;
  if (!listing) return null;

  const images = listing.imageUrls?.length > 0 ? listing.imageUrls : [`https://ui-avatars.com/api/?name=${encodeURIComponent(listing.title)}&size=600&background=e0e7ff&color=4f46e5&font-size=0.25&bold=true`];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-surface-500 hover:text-primary-600 mb-6 bg-transparent border-none cursor-pointer font-medium">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Images */}
        <div className="lg:col-span-3">
          <div className="glass-card overflow-hidden">
            <img src={images[currentImg]} alt={listing.title} className="w-full h-80 md:h-96 object-cover" />
            {images.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setCurrentImg(i)} className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer ${currentImg === i ? 'border-primary-500' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-6">
            <span className="badge badge-primary mb-3">{catLabels[listing.category]}</span>
            <h1 className="text-2xl font-bold text-surface-900 mb-2">{listing.title}</h1>
            <p className="flex items-center gap-1 text-3xl font-bold text-primary-600 mb-4">
              <IndianRupee size={24} />{listing.price > 0 ? listing.price.toLocaleString() : 'Free'}
            </p>
            <p className="text-surface-600 leading-relaxed">{listing.description || 'No description'}</p>
            <div className="flex gap-2 mt-4">
              {user && <button onClick={toggleBookmark} className="btn-secondary flex-1">{saved ? <><BookmarkCheck size={16} /> Saved</> : <><Bookmark size={16} /> Save</>}</button>}
              {user && <button onClick={() => setShowReport(true)} className="btn-secondary px-3" title="Report"><Flag size={16} /></button>}
            </div>
          </div>

          {/* Seller */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-surface-800 mb-3">Seller</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">{listing.seller?.fullName?.charAt(0)}</div>
              <div>
                <p className="font-medium text-surface-800">{listing.seller?.fullName}</p>
                <p className="text-xs text-surface-400">{listing.seller?.collegeName}</p>
              </div>
            </div>

            <h3 className="font-semibold text-surface-800 mb-3">Contact Seller</h3>
            <div className="space-y-2">
              {listing.contactWhatsapp && <a href={`https://wa.me/${listing.contactWhatsapp}`} target="_blank" className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors no-underline text-sm font-medium"><MessageCircle size={18} /> WhatsApp</a>}
              {listing.contactEmail && <a href={`mailto:${listing.contactEmail}`} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors no-underline text-sm font-medium"><Mail size={18} /> Email</a>}
              {listing.contactInstagram && <a href={`https://instagram.com/${listing.contactInstagram.replace('@','')}`} target="_blank" className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 transition-colors no-underline text-sm font-medium">@ Instagram</a>}
              {listing.contactPhone && <a href={`tel:${listing.contactPhone}`} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-50 text-surface-700 hover:bg-surface-100 transition-colors no-underline text-sm font-medium"><Phone size={18} /> Call</a>}
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowReport(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">Report Listing</h3>
            <form onSubmit={submitReport} className="space-y-4">
              <select required value={reportForm.reason} onChange={e => setReportForm({...reportForm, reason: e.target.value})} className="input-field">
                <option value="">Select reason</option>
                <option>Spam</option><option>Inappropriate</option><option>Scam</option><option>Duplicate</option><option>Other</option>
              </select>
              <textarea value={reportForm.description} onChange={e => setReportForm({...reportForm, description: e.target.value})} className="input-field" rows={3} placeholder="Details (optional)"></textarea>
              <div className="flex gap-3"><button type="button" onClick={() => setShowReport(false)} className="btn-secondary flex-1">Cancel</button><button type="submit" className="btn-danger flex-1">Submit Report</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
