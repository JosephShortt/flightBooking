import { useEffect, useState } from 'react';
import { api } from '../api';

function CreateFlightModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    departingAirport: '', destinationAirport: '', passengerCapacity: '',
    price: '', pilotName: '', pilotFlightTime: '', departureDateTime: '', arrivalDateTime: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  async function submit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.createFlight({
        ...form,
        passengerCapacity: parseInt(form.passengerCapacity),
        price: parseFloat(form.price),
        pilotFlightTime: parseFloat(form.pilotFlightTime),
      });
      onCreated();
    } catch {
      setError('Failed to create flight.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Create New Flight</h2>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={submit}>
          <div className="form-row">
            <div className="form-group">
              <label>Departing Airport</label>
              <input required value={form.departingAirport} onChange={e => set('departingAirport', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Destination Airport</label>
              <input required value={form.destinationAirport} onChange={e => set('destinationAirport', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Capacity</label>
              <input type="number" required min="1" value={form.passengerCapacity} onChange={e => set('passengerCapacity', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Price (€)</label>
              <input type="number" step="0.01" required value={form.price} onChange={e => set('price', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Pilot Name</label>
              <input required value={form.pilotName} onChange={e => set('pilotName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Pilot Flight Hours</label>
              <input type="number" required value={form.pilotFlightTime} onChange={e => set('pilotFlightTime', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Departure Date/Time</label>
              <input type="datetime-local" required value={form.departureDateTime} onChange={e => set('departureDateTime', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Arrival Date/Time</label>
              <input type="datetime-local" value={form.arrivalDateTime} onChange={e => set('arrivalDateTime', e.target.value)} />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Flight'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [expanded, setExpanded] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const data = await api.getFlights();
      setFlights(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function deleteFlight(code) {
    if (!confirm('Delete flight ' + code + '? This will cancel all bookings.')) return;
    await api.deleteFlight(code);
    setFlights(f => f.filter(x => x.flightCode !== code));
    if (expanded === code) setExpanded(null);
  }

  const filtered = flights.filter(f =>
    f.flightCode.toLowerCase().includes(search.toLowerCase()) ||
    f.departingAirport.toLowerCase().includes(search.toLowerCase()) ||
    f.destinationAirport.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Flight Management</h1>
        <button className="btn btn-primary" onClick={() => setShowCreate(true)}>+ New Flight</button>
      </div>

      <div className="table-card">
        <div className="table-card-header">
          <span>All Flights ({filtered.length})</span>
          <input className="search-bar" placeholder="Search by code or airport..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {loading ? <div className="loading">Loading...</div> : (
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Route</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Pilot</th>
                <th>Price</th>
                <th>Seats</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.flatMap(f => {
                const booked = f.passengerCapacity - f.remainingCapacity;
                const isFull = f.remainingCapacity === 0;
                const isExpanded = expanded === f.flightCode;
                const rows = [
                  <tr key={f.flightCode}>
                    <td><strong>{f.flightCode}</strong></td>
                    <td>{f.departingAirport} → {f.destinationAirport}</td>
                    <td>{new Date(f.departureDateTime).toLocaleString()}</td>
                    <td>{f.arrivalDateTime ? new Date(f.arrivalDateTime).toLocaleString() : '—'}</td>
                    <td>{f.pilot?.name || '—'}</td>
                    <td>€{f.price}</td>
                    <td>{booked}/{f.passengerCapacity}</td>
                    <td><span className={'badge ' + (isFull ? 'badge-red' : 'badge-green')}>{isFull ? 'Full' : 'Open'}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-sm btn-secondary" onClick={() => setExpanded(isExpanded ? null : f.flightCode)}>
                          {isExpanded ? 'Hide' : 'Manifest'}
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteFlight(f.flightCode)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ];
                if (isExpanded) {
                  rows.push(
                    <tr key={f.flightCode + '-manifest'} className="manifest-row">
                      <td colSpan={9} style={{ padding: '12px 24px 20px' }}>
                        <strong>Passenger Manifest — {f.passengers?.length || 0} passenger(s)</strong>
                        {f.passengers?.length > 0 ? (
                          <table style={{ marginTop: 10 }}>
                            <thead>
                              <tr><th>#</th><th>Name</th><th>Phone</th></tr>
                            </thead>
                            <tbody>
                              {f.passengers.map((p, i) => (
                                <tr key={p.passengerId}>
                                  <td>{i + 1}</td>
                                  <td>{p.name}</td>
                                  <td>{p.phone || '—'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : <div style={{ color: '#aaa', marginTop: 8 }}>No passengers booked yet.</div>}
                      </td>
                    </tr>
                  );
                }
                return rows;
              })}
              {filtered.length === 0 && <tr><td colSpan={9} className="empty">No flights found.</td></tr>}
            </tbody>
          </table>
        )}
      </div>

      {showCreate && (
        <CreateFlightModal onClose={() => setShowCreate(false)} onCreated={() => { setShowCreate(false); load(); }} />
      )}
    </div>
  );
}
