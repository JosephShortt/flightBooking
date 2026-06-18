import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.getStats(), api.getFlights()])
      .then(([s, f]) => { setStats(s); setFlights(f); })
      .catch(() => setError('Failed to load dashboard data. Make sure the backend is running and you are logged in as admin.'));
  }, []);

  if (error) return <div className="error-msg">{error}</div>;
  if (!stats) return <div className="loading">Loading dashboard...</div>;

  const upcoming = flights
    .filter(f => new Date(f.departureDateTime) > new Date())
    .sort((a, b) => new Date(a.departureDateTime) - new Date(b.departureDateTime))
    .slice(0, 8);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Flights</div>
          <div className="stat-value">{stats.totalFlights}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Users</div>
          <div className="stat-value">{stats.totalUsers}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Bookings</div>
          <div className="stat-value">{stats.totalBookings}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value">€{stats.totalRevenue.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Occupancy</div>
          <div className="stat-value">{stats.avgOccupancy}%</div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-card-header">Upcoming Flights</div>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Route</th>
              <th>Departure</th>
              <th>Pilot</th>
              <th>Occupancy</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {upcoming.map(f => {
              const booked = f.passengerCapacity - f.remainingCapacity;
              const pct = Math.round((booked / f.passengerCapacity) * 100);
              const isFull = f.remainingCapacity === 0;
              return (
                <tr key={f.id}>
                  <td><strong>{f.flightCode}</strong></td>
                  <td>{f.departingAirport} → {f.destinationAirport}</td>
                  <td>{new Date(f.departureDateTime).toLocaleString()}</td>
                  <td>{f.pilot?.name || '—'}</td>
                  <td>{booked}/{f.passengerCapacity} ({pct}%)</td>
                  <td>
                    <span className={`badge ${isFull ? 'badge-red' : 'badge-green'}`}>
                      {isFull ? 'Full' : 'Available'}
                    </span>
                  </td>
                </tr>
              );
            })}
            {upcoming.length === 0 && (
              <tr><td colSpan={6} className="empty">No upcoming flights</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
