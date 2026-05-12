import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Menu, X, ShoppingBag, User, LogOut, BookmarkIcon, LayoutDashboard, Shield,
  PlusCircle
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-surface-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
              <ShoppingBag size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              CampusMart
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/browse" className="text-surface-600 hover:text-primary-600 font-medium transition-colors no-underline">
              Browse
            </Link>
            {user ? (
              <>
                <Link to="/create-listing" className="btn-primary text-sm py-2 px-4 no-underline">
                  <PlusCircle size={16} /> Sell Item
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm cursor-pointer border-none hover:shadow-lg transition-shadow"
                  >
                    {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-surface-100 py-2 animate-slide-down">
                      <div className="px-4 py-2 border-b border-surface-100">
                        <p className="font-semibold text-sm text-surface-800">{user.fullName}</p>
                        <p className="text-xs text-surface-400">{user.email}</p>
                      </div>
                      <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 hover:bg-surface-50 no-underline" onClick={() => setProfileOpen(false)}>
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                      <Link to="/saved" className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 hover:bg-surface-50 no-underline" onClick={() => setProfileOpen(false)}>
                        <BookmarkIcon size={16} /> Saved Items
                      </Link>
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 hover:bg-surface-50 no-underline" onClick={() => setProfileOpen(false)}>
                        <User size={16} /> Profile
                      </Link>
                      {isAdmin() && (
                        <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-primary-600 hover:bg-primary-50 no-underline" onClick={() => setProfileOpen(false)}>
                          <Shield size={16} /> Admin Panel
                        </Link>
                      )}
                      <hr className="my-1 border-surface-100" />
                      <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full border-none bg-transparent cursor-pointer">
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="btn-secondary text-sm py-2 px-4 no-underline">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4 no-underline">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-surface-100 border-none bg-transparent cursor-pointer">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 animate-slide-down">
            <Link to="/browse" className="block py-2 text-surface-700 no-underline" onClick={() => setMenuOpen(false)}>Browse</Link>
            {user ? (
              <>
                <Link to="/create-listing" className="block py-2 text-primary-600 font-medium no-underline" onClick={() => setMenuOpen(false)}>+ Sell Item</Link>
                <Link to="/dashboard" className="block py-2 text-surface-700 no-underline" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link to="/saved" className="block py-2 text-surface-700 no-underline" onClick={() => setMenuOpen(false)}>Saved</Link>
                <Link to="/profile" className="block py-2 text-surface-700 no-underline" onClick={() => setMenuOpen(false)}>Profile</Link>
                {isAdmin() && <Link to="/admin" className="block py-2 text-primary-600 no-underline" onClick={() => setMenuOpen(false)}>Admin</Link>}
                <button onClick={handleLogout} className="mt-2 text-red-600 border-none bg-transparent cursor-pointer font-medium">Logout</button>
              </>
            ) : (
              <div className="flex gap-3 mt-3">
                <Link to="/login" className="btn-secondary text-sm no-underline" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn-primary text-sm no-underline" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
