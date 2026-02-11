
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShieldCheck, LogOut, Disc } from 'lucide-react';
import { User } from '../types';
import { APP_NAME, LOGO_PATH } from '../constants';

interface SidebarProps {
  user: User | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Distribute', path: '/distribute', icon: Disc },
  ];

  if (user?.role === 'ADMIN') {
    navItems.push({ name: 'Admin Panel', path: '/admin', icon: ShieldCheck });
  }

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col hidden md:flex">
      <div className="p-6">
        <NavLink to="/">
          <img 
            src={LOGO_PATH} 
            alt={APP_NAME} 
            className="h-14 w-auto object-contain hover:opacity-90 transition-opacity" 
          />
        </NavLink>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-zinc-800 text-indigo-400 font-medium'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3 mb-4 px-4">
          <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold">
            {user?.stage_name?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user?.stage_name}</p>
            <p className="text-xs text-zinc-500 truncate">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-zinc-400 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
