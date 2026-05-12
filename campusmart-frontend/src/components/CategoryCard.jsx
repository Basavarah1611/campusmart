import { Link } from 'react-router-dom';

const categories = [
  { key: 'NOTES', label: 'Notes', emoji: '📝', color: 'from-blue-500 to-blue-600', desc: 'Study materials & notes' },
  { key: 'BOOKS', label: 'Books', emoji: '📚', color: 'from-green-500 to-emerald-600', desc: 'Textbooks & novels' },
  { key: 'ELECTRONICS', label: 'Electronics', emoji: '💻', color: 'from-purple-500 to-violet-600', desc: 'Gadgets & devices' },
  { key: 'USED_ITEMS', label: 'Used Items', emoji: '🛍️', color: 'from-amber-500 to-orange-600', desc: 'Pre-owned goods' },
  { key: 'ROOMMATES', label: 'Roommates', emoji: '🏠', color: 'from-pink-500 to-rose-600', desc: 'Find your roommate' },
  { key: 'EVENT_TICKETS', label: 'Tickets', emoji: '🎫', color: 'from-cyan-500 to-teal-600', desc: 'Events & shows' },
];

export default function CategoryCard({ category }) {
  const cat = categories.find(c => c.key === category) || categories[0];

  return (
    <Link
      to={`/browse?category=${cat.key}`}
      className="no-underline group"
    >
      <div className="glass-card p-6 h-full flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-xl transition-all duration-300">
        <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          {cat.emoji}
        </div>
        <h3 className="font-semibold text-surface-800 text-sm mb-1">{cat.label}</h3>
        <p className="text-xs text-surface-400">{cat.desc}</p>
      </div>
    </Link>
  );
}

export { categories };
