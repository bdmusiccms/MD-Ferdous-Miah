
import React from 'react';
import { User, ReleaseStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Users, Play, Radio } from 'lucide-react';

const mockChartData = [
  { name: 'Mon', streams: 4000 },
  { name: 'Tue', streams: 3000 },
  { name: 'Wed', streams: 2000 },
  { name: 'Thu', streams: 2780 },
  { name: 'Fri', streams: 1890 },
  { name: 'Sat', streams: 2390 },
  { name: 'Sun', streams: 3490 },
];

const mockReleases = [
  { id: '1', title: 'Midnight Echoes', status: ReleaseStatus.DISTRIBUTED, streams: '125.4k', date: 'Oct 24, 2023', cover: 'https://picsum.photos/seed/music1/400/400' },
  { id: '2', title: 'Solar Flare', status: ReleaseStatus.PENDING, streams: '0', date: 'In Review', cover: 'https://picsum.photos/seed/music2/400/400' },
  { id: '3', title: 'Neon Dreams (EP)', status: ReleaseStatus.DISTRIBUTED, streams: '42.1k', date: 'Aug 12, 2023', cover: 'https://picsum.photos/seed/music3/400/400' },
];

const StatCard = ({ title, value, icon: Icon, trend }: any) => (
  <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-indigo-500/10 rounded-lg">
        <Icon className="text-indigo-400 h-6 w-6" />
      </div>
      {trend && (
        <span className="text-emerald-400 text-xs font-medium flex items-center gap-1 bg-emerald-400/10 px-2 py-1 rounded-full">
          <TrendingUp className="h-3 w-3" />
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-zinc-400 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

const ArtistDashboard: React.FC<{ user: User | null }> = ({ user }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-white">Welcome back, {user?.stage_name}!</h2>
        <p className="text-zinc-400 mt-1">Here's how your music is performing across platforms.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Streams" value="167,502" icon={Play} trend="+12%" />
        <StatCard title="Active Listeners" value="12,403" icon={Users} trend="+5.4%" />
        <StatCard title="Followers" value="8,291" icon={Radio} trend="+2%" />
        <StatCard title="Total Revenue" value="$2,451.20" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6">Streaming Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip
                  cursor={{ fill: '#27272a' }}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                />
                <Bar dataKey="streams" radius={[4, 4, 0, 0]}>
                  {mockChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === mockChartData.length - 1 ? '#4f46e5' : '#3f3f46'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6">Recent Releases</h3>
          <div className="space-y-4">
            {mockReleases.map((release) => (
              <div key={release.id} className="flex items-center gap-4 group cursor-pointer hover:bg-zinc-800/30 p-2 rounded-xl transition-all">
                <img src={release.cover} alt={release.title} className="h-12 w-12 rounded-lg object-cover shadow-lg" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white truncate">{release.title}</h4>
                  <p className="text-xs text-zinc-500">{release.date}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${
                    release.status === ReleaseStatus.DISTRIBUTED ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {release.status}
                  </span>
                  <p className="text-xs text-zinc-400 mt-1">{release.streams} streams</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium border border-indigo-500/20 rounded-xl hover:bg-indigo-500/5 transition-colors">
            View All Music
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;
