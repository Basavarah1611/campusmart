import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import { listingService } from '../services/listingService';
import { categories } from '../components/CategoryCard';

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');

  useEffect(() => { loadListings(); }, [page, searchParams]);

  const loadListings = async () => {
    setLoading(true);
    try {
      const params = { page, size: 12, search: searchParams.get('search') || undefined, category: searchParams.get('category') || undefined };
      const res = await listingService.getListings(params);
      setListings(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
    } catch { setListings([]); }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const p = {};
    if (search) p.search = search;
    if (category) p.category = category;
    setSearchParams(p);
    setPage(0);
  };

  const handleCategoryFilter = (cat) => {
    const nc = category === cat ? '' : cat;
    setCategory(nc);
    const p = {};
    if (search) p.search = search;
    if (nc) p.category = nc;
    setSearchParams(p);
    setPage(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Browse Listings</h1>
        <p className="text-surface-500">Discover what students are selling</p>
      </div>

      <div className="glass-card p-4 mb-8">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search listings..." className="input-field pl-10" />
          </div>
          <button type="submit" className="btn-primary px-6">Search</button>
        </form>
        <div className="flex flex-wrap gap-2 mt-4">
          <button onClick={() => handleCategoryFilter('')} className={`px-4 py-1.5 rounded-full text-sm font-medium border-none cursor-pointer transition-all ${!category ? 'bg-primary-600 text-white' : 'bg-surface-100 text-surface-600 hover:bg-surface-200'}`}>All</button>
          {categories.map(cat => (
            <button key={cat.key} onClick={() => handleCategoryFilter(cat.key)} className={`px-4 py-1.5 rounded-full text-sm font-medium border-none cursor-pointer transition-all ${category === cat.key ? 'bg-primary-600 text-white' : 'bg-surface-100 text-surface-600 hover:bg-surface-200'}`}>{cat.emoji} {cat.label}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (<div key={i} className="glass-card overflow-hidden"><div className="skeleton h-48 w-full"></div><div className="p-4 space-y-3"><div className="skeleton h-5 w-3/4"></div><div className="skeleton h-4 w-full"></div><div className="skeleton h-6 w-1/3"></div></div></div>))}
        </div>
      ) : listings.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {[...Array(totalPages)].map((_, i) => (<button key={i} onClick={() => setPage(i)} className={`w-10 h-10 rounded-lg font-medium border-none cursor-pointer ${page === i ? 'bg-primary-600 text-white' : 'bg-surface-100 text-surface-600'}`}>{i + 1}</button>))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20"><div className="text-6xl mb-4">🔍</div><h3 className="text-xl font-semibold text-surface-700 mb-2">No listings found</h3><p className="text-surface-500">Try adjusting your search or filters</p></div>
      )}
    </div>
  );
}
