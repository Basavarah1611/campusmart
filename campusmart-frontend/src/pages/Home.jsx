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
        {/* Dynamic Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-[20%] w-[500px] h-[500px] bg-primary-600/40 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-10 right-[20%] w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 rounded-full blur-[150px] mix-blend-screen"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-full px-5 py-2 mb-8 text-sm border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <Sparkles size={16} className="text-amber-300" />
              <span className="text-white/90 font-medium tracking-wide">Exclusive for City Engineering College</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight text-white drop-shadow-sm">
              Your Campus
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 drop-shadow-sm"> 
                Marketplace
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-indigo-100/80 mb-10 leading-relaxed font-light max-w-2xl mx-auto">
              Buy and sell notes, textbooks, electronics, find roommates, and grab event tickets — all within your college community.
            </p>
            
            <div className="relative p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-w-2xl mx-auto mb-10 transform transition-all hover:scale-[1.01] hover:bg-white/10">
              <SearchBar className="w-full" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-5">
              <Link to="/browse" className="btn-primary px-8 py-4 text-base no-underline shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]">
                Browse All <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="btn-secondary !bg-white/5 !text-white !border-white/20 px-8 py-4 text-base no-underline backdrop-blur-md hover:!bg-white/10">
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip - Floating Style */}
      <section className="relative z-20 -mt-10 mb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-surface-200">
              <div className="flex items-center justify-center gap-4 pt-4 md:pt-0">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                  <Users size={24} />
                </div>
                <div>
                  <p className="font-bold text-surface-900 text-lg">Campus Only</p>
                  <p className="text-sm text-surface-500 font-medium">Verified students</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 pt-4 md:pt-0">
                <div className="w-12 h-12 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="font-bold text-surface-900 text-lg">Safe & Trusted</p>
                  <p className="text-sm text-surface-500 font-medium">Verified community</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 pt-4 md:pt-0">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="font-bold text-surface-900 text-lg">Zero Fees</p>
                  <p className="text-sm text-surface-500 font-medium">100% Free to use</p>
                </div>
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
