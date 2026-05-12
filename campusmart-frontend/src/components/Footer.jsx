import { ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
                <ShoppingBag size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">CampusMart</span>
            </div>
            <p className="text-surface-400 text-sm leading-relaxed max-w-md">
              The exclusive marketplace for City Engineering College students. Buy, sell, and trade
              notes, textbooks, electronics, and more — all within your campus community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/browse" className="text-surface-400 hover:text-primary-400 transition-colors no-underline text-sm">Browse Listings</Link>
              <Link to="/browse?category=NOTES" className="text-surface-400 hover:text-primary-400 transition-colors no-underline text-sm">Notes & Study Material</Link>
              <Link to="/browse?category=BOOKS" className="text-surface-400 hover:text-primary-400 transition-colors no-underline text-sm">Books</Link>
              <Link to="/browse?category=ELECTRONICS" className="text-surface-400 hover:text-primary-400 transition-colors no-underline text-sm">Electronics</Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">More</h4>
            <div className="flex flex-col gap-2">
              <Link to="/browse?category=USED_ITEMS" className="text-surface-400 hover:text-primary-400 transition-colors no-underline text-sm">Used Items</Link>
              <Link to="/browse?category=ROOMMATES" className="text-surface-400 hover:text-primary-400 transition-colors no-underline text-sm">Find Roommates</Link>
              <Link to="/browse?category=EVENT_TICKETS" className="text-surface-400 hover:text-primary-400 transition-colors no-underline text-sm">Event Tickets</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-surface-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-surface-500 text-sm">
            © {new Date().getFullYear()} CampusMart. Made with <Heart size={14} className="inline text-red-400" /> for students.
          </p>
          <p className="text-surface-500 text-sm">
            City Engineering College — Exclusive Campus Marketplace
          </p>
        </div>
      </div>
    </footer>
  );
}
