import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Users, TrendingUp, Sparkles } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import CategoryCard, { categories } from '../components/CategoryCard';
import ListingCard from '../components/ListingCard';
import { listingService } from '../services/listingService';

export default function Home() {
  const [latestListings, setLatestListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLatest();
  }, []);

  const loadLatest = async () => {
    try {
      const res = await listingService.getListings({ page: 0, size: 8 });
      setLatestListings(res.data.content || []);
    } catch {
      // Server not running yet, show empty state
      setLatestListings([]);
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 text-sm border border-white/10">
              <Sparkles size={14} className="text-amber-400" />
              <span className="text-surface-200">Exclusive for City Engineering College</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Your Campus
              <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> Marketplace</span>
            </h1>
            <p className="text-lg md:text-xl text-surface-300 mb-10 leading-relaxed">
              Buy and sell notes, textbooks, electronics, find roommates, and grab event tickets — all within your college community.
            </p>
            <SearchBar className="max-w-2xl mx-auto mb-8" />
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/browse" className="btn-primary px-8 py-3 text-base no-underline">
                Browse All <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="btn-secondary !bg-white/10 !text-white !border-white/20 px-8 py-3 text-base no-underline hover:!bg-white/20">
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-white border-b border-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 gap-8">
            <div className="flex items-center justify-center gap-3">
              <Users size={24} className="text-primary-500" />
              <div>
                <p className="font-bold text-surface-800 text-lg">Campus Only</p>
                <p className="text-xs text-surface-400">Verified students</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <ShieldCheck size={24} className="text-accent-500" />
              <div>
                <p className="font-bold text-surface-800 text-lg">Safe & Trusted</p>
                <p className="text-xs text-surface-400">Verified community</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <TrendingUp size={24} className="text-purple-500" />
              <div>
                <p className="font-bold text-surface-800 text-lg">Zero Fees</p>
                <p className="text-xs text-surface-400">Free to use</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-surface-900 mb-3">Browse by Category</h2>
          <p className="text-surface-500">Find exactly what you need from fellow students</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map(cat => (
            <CategoryCard key={cat.key} category={cat.key} />
          ))}
        </div>
      </section>

      {/* Latest Listings */}
      <section className="bg-surface-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-surface-900 mb-2">Latest Listings</h2>
              <p className="text-surface-500">Fresh items from your campus</p>
            </div>
            <Link to="/browse" className="btn-secondary text-sm no-underline">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="glass-card overflow-hidden">
                  <div className="skeleton h-48 w-full"></div>
                  <div className="p-4 space-y-3">
                    <div className="skeleton h-5 w-3/4"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-6 w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : latestListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold text-surface-700 mb-2">No listings yet</h3>
              <p className="text-surface-500 mb-6">Be the first to sell something on CampusMart!</p>
              <Link to="/create-listing" className="btn-primary no-underline">Post Your First Listing</Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to sell something?</h2>
          <p className="text-lg text-white/80 mb-8">
            List your items for free and reach students across your campus instantly.
          </p>
          <Link to="/register" className="btn-secondary !bg-white !text-primary-700 !border-none px-8 py-3 text-base font-bold no-underline hover:!bg-surface-100">
            Get Started Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
