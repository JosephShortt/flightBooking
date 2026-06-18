import { useEffect, useState } from 'react';
import { api } from '../api';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.getBookings()
      .then(setBookings)
      .catch(() => setError('Failed to load bookings.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = bookings.filter(b =>
    b.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.flight?.flightCode?.toLowerCase().includes(search.toLowerCase()) ||
    b.flight?.departingAirport?.toLowerCase().includes(search.toLowerCase()) ||
    b.flight?.destinationAirport?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">All Bookings</h1>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <div className="table-card">
        <div className="table-card-header">
          <span>Bookings ({filtered.length})</span>
          <input className="search-bar" placeholder="Search by passenger or flight..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {loading ? <div className="loading">Loading...</div> : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Passenger</th>
                <th>Phone</th>
                <th>Flight</th>
                <th>Route</th>
                <th>Departure</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, i) => (
                <tr key={b.passengerId}>
                  <td>{i + 1}</td>
                  <td>{b.name}</td>
                  <td>{b.phone || '—'}</td>
                  <td><strong>{b.flight?.flightCode || '—'}</strong></td>
                  <td>{b.flight ? b.flight.departingAirport + ' → ' + b.flight.destinationAirport : '—'}</td>
                  <td>{b.flight?.departureDateTime ? new Date(b.flight.departureDateTime).toLocaleString() : '—'}</td>
                  <td>{b.flight ? '€' + b.flight.price : '—'}</td>
                  <td><span className="badge badge-green">Confirmed</span></td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={8} className="empty">No bookings found.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
