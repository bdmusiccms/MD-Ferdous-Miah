
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ArtistDashboard from './components/ArtistDashboard';
import AdminPanel from './components/AdminPanel';
import DistributionForm from './components/DistributionForm';
import AuthView from './components/AuthView';
import { User, AuthState } from './types';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  // Persist session mock
  useEffect(() => {
    const savedUser = localStorage.getItem('fm_user');
    if (savedUser) {
      setAuth({ user: JSON.parse(savedUser), isAuthenticated: true });
    }
  }, []);

  const handleLogin = (user: User) => {
    setAuth({ user, isAuthenticated: true });
    localStorage.setItem('fm_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setAuth({ user: null, isAuthenticated: false });
    localStorage.removeItem('fm_user');
  };

  if (!auth.isAuthenticated) {
    return <AuthView onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-zinc-950 overflow-hidden">
        <Sidebar user={auth.user} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<ArtistDashboard user={auth.user} />} />
            <Route path="/distribute" element={<DistributionForm user={auth.user} />} />
            {auth.user?.role === 'ADMIN' && (
              <Route path="/admin" element={<AdminPanel />} />
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
