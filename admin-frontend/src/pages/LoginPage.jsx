import { useState } from 'react';
import { api } from '../api';
import { auth } from '../auth';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('admin@flightbooking.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.login(email, password);
      auth.save(res.token, { name: res.name, email: res.email });
      onLogin();
    } catch {
      setError('Invalid credentials or not an admin account.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>✈ Admin Panel</h1>
        <p className="login-subtitle">Flight Booking System — Administration</p>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
