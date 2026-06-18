import { useState } from 'react';
import { auth } from './auth';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import FlightsPage from './pages/FlightsPage';
import BookingsPage from './pages/BookingsPage';
import PilotsPage from './pages/PilotsPage';
import UsersPage from './pages/UsersPage';
import './App.css';

const NAV = [
  { id: 'dashboard', label: '📊 Dashboard' },
  { id: 'flights', label: '✈ Flights' },
  { id: 'bookings', label: '🎫 Bookings' },
  { id: 'pilots', label: '🧑‍✈️ Pilots' },
  { id: 'users', label: '👥 Users' },
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(auth.isLoggedIn());
  const [tab, setTab] = useState('dashboard');

  function handleLogin() { setLoggedIn(true); }
  function handleLogout() { auth.clear(); setLoggedIn(false); }

  if (!loggedIn) return <LoginPage onLogin={handleLogin} />;

  const user = auth.getUser();

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">✈ Admin Panel</div>
        <nav className="sidebar-nav">
          {NAV.map(n => (
            <button
              key={n.id}
              className={`nav-item ${tab === n.id ? 'active' : ''}`}
              onClick={() => setTab(n.id)}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="admin-name">{user?.name}</div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </aside>
      <main className="main-content">
        {tab === 'dashboard' && <Dashboard />}
        {tab === 'flights' && <FlightsPage />}
        {tab === 'bookings' && <BookingsPage />}
        {tab === 'pilots' && <PilotsPage />}
        {tab === 'users' && <UsersPage />}
      </main>
    </div>
  );
}
