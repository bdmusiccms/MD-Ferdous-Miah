
import React, { useState } from 'react';
import { User } from '../types';
import { APP_NAME, LOGO_PATH } from '../constants';
import { ArrowRight, Shield, User as UserIcon } from 'lucide-react';

interface AuthViewProps {
  onLogin: (user: User) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stageName, setStageName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock Auth Logic
    setTimeout(() => {
      const isManager = email.includes('admin');
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: stageName || 'New Artist',
        stage_name: stageName || (isManager ? 'Admin Console' : 'Rising Star'),
        role: isManager ? 'ADMIN' : 'ARTIST',
      };
      onLogin(mockUser);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <img 
            src={LOGO_PATH} 
            alt={APP_NAME} 
            className="h-28 w-auto mb-4 drop-shadow-[0_0_20px_rgba(79,70,229,0.3)]" 
          />
          <p className="text-zinc-500 mt-2 text-center">The future of independent music distribution.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl backdrop-blur-sm">
          <div className="flex gap-4 mb-8 bg-zinc-800/50 p-1 rounded-xl">
            <button 
              onClick={() => setMode('LOGIN')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'LOGIN' ? 'bg-zinc-700 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setMode('SIGNUP')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'SIGNUP' ? 'bg-zinc-700 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Join Station
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'SIGNUP' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Stage Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input 
                    type="text" 
                    required
                    value={stageName}
                    onChange={(e) => setStageName(e.target.value)}
                    placeholder="e.g. DJ Midnight"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                </div>
              </div>
            )}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'LOGIN' ? 'Enter Studio' : 'Start My Career'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-zinc-500 text-xs text-center">
            <Shield size={12} className="shrink-0" />
            Secure Artist Portal • Tip: Login with 'admin' in email for Admin role
          </div>
        </div>

        <p className="text-center mt-8 text-zinc-600 text-xs">
          By continuing, you agree to FM Music Station's <br/>
          <span className="text-zinc-500 underline cursor-pointer hover:text-zinc-400">Terms of Service</span> and <span className="text-zinc-500 underline cursor-pointer hover:text-zinc-400">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default AuthView;
