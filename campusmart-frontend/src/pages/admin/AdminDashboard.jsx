import { useState, useEffect } from 'react';
import { Shield, Users, Package, AlertTriangle, Trash2, Eye } from 'lucide-react';
import { adminService } from '../../services/reportService';

export default function AdminDashboard() {
  const [tab, setTab] = useState('stats');
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    try {
      const [s, u, r] = await Promise.all([adminService.getStats(), adminService.getUsers(), adminService.getReports()]);
      setStats(s.data);
      setUsers(u.data);
      setReports(r.data);
    } catch {}
    setLoading(false);
  };

  const deleteUser = async (id) => { if (!confirm('Delete user?')) return; await adminService.deleteUser(id); setUsers(prev => prev.filter(u => u.id !== id)); };
  const deleteListing = async (id) => { if (!confirm('Delete listing?')) return; await adminService.deleteListing(id); loadAll(); };
  const updateReport = async (id, status) => { await adminService.updateReportStatus(id, status); setReports(prev => prev.map(r => r.id === id ? {...r, status} : r)); };

  const tabs = [
    { id: 'stats', label: 'Overview', icon: <Shield size={16} /> },
    { id: 'users', label: 'Users', icon: <Users size={16} /> },
    { id: 'reports', label: 'Reports', icon: <AlertTriangle size={16} /> },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <Shield size={28} className="text-primary-600" />
        <h1 className="text-3xl font-bold text-surface-900">Admin Panel</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border-none cursor-pointer transition-all ${tab === t.id ? 'bg-primary-600 text-white' : 'bg-surface-100 text-surface-600 hover:bg-surface-200'}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      {tab === 'stats' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-6 text-center"><p className="text-3xl font-bold text-primary-600">{stats.totalUsers || 0}</p><p className="text-sm text-surface-500 mt-1">Total Users</p></div>
          <div className="glass-card p-6 text-center"><p className="text-3xl font-bold text-accent-500">{stats.totalListings || 0}</p><p className="text-sm text-surface-500 mt-1">Total Listings</p></div>
          <div className="glass-card p-6 text-center"><p className="text-3xl font-bold text-purple-500">{stats.activeListings || 0}</p><p className="text-sm text-surface-500 mt-1">Active Listings</p></div>
          <div className="glass-card p-6 text-center"><p className="text-3xl font-bold text-red-500">{stats.pendingReports || 0}</p><p className="text-sm text-surface-500 mt-1">Pending Reports</p></div>
        </div>
      )}

      {/* Users */}
      {tab === 'users' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface-50"><tr><th className="text-left px-4 py-3 font-semibold text-surface-600">Name</th><th className="text-left px-4 py-3 font-semibold text-surface-600">Email</th><th className="text-left px-4 py-3 font-semibold text-surface-600">Role</th><th className="px-4 py-3"></th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t border-surface-100">
                  <td className="px-4 py-3 font-medium">{u.fullName}</td>
                  <td className="px-4 py-3 text-surface-500">{u.email}</td>
                  <td className="px-4 py-3"><span className={`badge ${u.role === 'ADMIN' ? 'badge-primary' : 'badge-accent'}`}>{u.role}</span></td>
                  <td className="px-4 py-3 text-right">{u.role !== 'ADMIN' && <button onClick={() => deleteUser(u.id)} className="btn-danger text-xs"><Trash2 size={14} /></button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reports */}
      {tab === 'reports' && (
        <div className="space-y-3">
          {reports.length === 0 ? (
            <div className="text-center py-12"><div className="text-5xl mb-4">✅</div><p className="text-surface-500">No reports</p></div>
          ) : reports.map(r => (
            <div key={r.id} className="glass-card p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-surface-800">{r.reason}</p>
                <p className="text-sm text-surface-500">{r.description || 'No details'}</p>
                <span className={`badge mt-2 ${r.status === 'PENDING' ? 'badge-warning' : r.status === 'REVIEWED' ? 'badge-primary' : 'badge-accent'}`}>{r.status}</span>
              </div>
              <div className="flex gap-2">
                {r.status === 'PENDING' && <button onClick={() => updateReport(r.id, 'REVIEWED')} className="btn-secondary text-xs">Review</button>}
                {r.status !== 'RESOLVED' && <button onClick={() => updateReport(r.id, 'RESOLVED')} className="btn-primary text-xs">Resolve</button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
