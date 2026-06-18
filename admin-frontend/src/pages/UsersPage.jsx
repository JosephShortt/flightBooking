import { useEffect, useState } from 'react';
import { api } from '../api';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.getUsers(), api.getBookings()])
      .then(([u, b]) => { setUsers(u); setBookings(b); })
      .catch(() => setError('Failed to load users.'))
      .finally(() => setLoading(false));
  }, []);

  async function deleteUser(id, name) {
    if (!confirm('Delete user ' + name + '? This cannot be undone.')) return;
    await api.deleteUser(id);
    setUsers(u => u.filter(x => x.id !== id));
  }

  function bookingsForUser(userId) {
    return bookings.filter(b => {
      // bookings don't expose userId directly — match by passenger name against user name
      // we use the user id approach: the booking user field is @JsonIgnore so we match by name as fallback
      return b.name === users.find(u => u.id === userId)?.name;
    });
  }

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <div className="table-card">
        <div className="table-card-header">
          <span>Users ({filtered.length})</span>
          <input className="search-bar" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {loading ? <div className="loading">Loading...</div> : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Bookings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.flatMap(u => {
                const isExpanded = expanded === u.id;
                const userBookings = bookingsForUser(u.id);
                const rows = [
                  <tr key={u.id}>
                    <td><strong>{u.name}</strong></td>
                    <td>{u.email}</td>
                    <td>{u.phone || '—'}</td>
                    <td>
                      <span className={'badge ' + (u.role === 'ADMIN' ? 'badge-purple' : 'badge-blue')}>
                        {u.role || 'USER'}
                      </span>
                    </td>
                    <td>{userBookings.length}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {userBookings.length > 0 && (
                          <button className="btn btn-sm btn-secondary" onClick={() => setExpanded(isExpanded ? null : u.id)}>
                            {isExpanded ? 'Hide' : 'Bookings'}
                          </button>
                        )}
                        {u.role !== 'ADMIN' && (
                          <button className="btn btn-sm btn-danger" onClick={() => deleteUser(u.id, u.name)}>Delete</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ];
                if (isExpanded && userBookings.length > 0) {
                  rows.push(
                    <tr key={u.id + '-bookings'} className="manifest-row">
                      <td colSpan={6} style={{ padding: '12px 24px 20px' }}>
                        <strong>Booking History</strong>
                        <table style={{ marginTop: 10 }}>
                          <thead>
                            <tr><th>Flight</th><th>Route</th><th>Departure</th><th>Price</th></tr>
                          </thead>
                          <tbody>
                            {userBookings.map(b => (
                              <tr key={b.passengerId}>
                                <td><strong>{b.flight?.flightCode || '—'}</strong></td>
                                <td>{b.flight ? b.flight.departingAirport + ' → ' + b.flight.destinationAirport : '—'}</td>
                                <td>{b.flight?.departureDateTime ? new Date(b.flight.departureDateTime).toLocaleString() : '—'}</td>
                                <td>{b.flight ? '€' + b.flight.price : '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  );
                }
                return rows;
              })}
              {filtered.length === 0 && <tr><td colSpan={6} className="empty">No users found.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
