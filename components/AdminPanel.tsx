
import React, { useState } from 'react';
import { ReleaseStatus } from '../types';
import { Search, Filter, MoreVertical, ExternalLink, CheckCircle, XCircle, Clock } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [submissions, setSubmissions] = useState([
    { id: '101', artist: 'Nova Sky', title: 'Galactic Horizon', genre: 'Electronic', date: '2023-11-20', status: ReleaseStatus.PENDING },
    { id: '102', artist: 'The Rhythm Co.', title: 'Back 2 Basics', genre: 'Hip-Hop', date: '2023-11-21', status: ReleaseStatus.PENDING },
    { id: '103', artist: 'Elena Ray', title: 'Faded Memories', genre: 'Pop', date: '2023-11-22', status: ReleaseStatus.PENDING },
    { id: '104', artist: 'Acid Jazz Trio', title: 'Blue Monday', genre: 'Jazz', date: '2023-11-23', status: ReleaseStatus.DISTRIBUTED },
  ]);

  const updateStatus = (id: string, newStatus: ReleaseStatus) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white">Admin Submissions</h2>
          <p className="text-zinc-400 mt-1">Review and distribute pending music releases.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search artists..."
              className="bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm font-medium hover:bg-zinc-800">
            <Filter size={16} /> Filters
          </button>
        </div>
      </header>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-800/50 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Artist & Title</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Genre</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Submitted</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {submissions.map((sub) => (
              <tr key={sub.id} className="hover:bg-zinc-800/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                      <ExternalLink size={16} className="text-zinc-600 group-hover:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{sub.title}</p>
                      <p className="text-xs text-zinc-500">{sub.artist}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-400">{sub.genre}</td>
                <td className="px-6 py-4 text-sm text-zinc-400">{sub.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    sub.status === ReleaseStatus.DISTRIBUTED 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : sub.status === ReleaseStatus.PENDING
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-red-500/10 text-red-400'
                  }`}>
                    {sub.status === ReleaseStatus.PENDING && <Clock size={12} />}
                    {sub.status === ReleaseStatus.DISTRIBUTED && <CheckCircle size={12} />}
                    {sub.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {sub.status === ReleaseStatus.PENDING ? (
                      <>
                        <button 
                          onClick={() => updateStatus(sub.id, ReleaseStatus.DISTRIBUTED)}
                          className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors"
                          title="Approve & Distribute"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          onClick={() => updateStatus(sub.id, ReleaseStatus.REJECTED)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Reject Submission"
                        >
                          <XCircle size={18} />
                        </button>
                      </>
                    ) : (
                      <button className="p-2 text-zinc-500 hover:bg-zinc-800 rounded-lg">
                        <MoreVertical size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
