import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ className = '' }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/browse?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative flex items-center bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-2xl p-1.5 focus-within:border-primary-400 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition-all ${className}`}>
      <Search size={20} className="text-surface-400 ml-3 mr-2 flex-shrink-0" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for notes, books, electronics, roommates..."
        className="flex-1 bg-transparent border-none text-surface-800 placeholder-surface-400 focus:outline-none py-2.5 text-sm w-full"
      />
      <button
        type="submit"
        className="btn-primary py-2.5 px-6 text-sm rounded-xl ml-2 whitespace-nowrap flex-shrink-0"
      >
        Search
      </button>
    </form>
  );
}
