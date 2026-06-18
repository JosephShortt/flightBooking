import { useEffect, useState } from 'react';
import { api } from '../api';

function EditPilotModal({ pilot, onClose, onSaved }) {
  const [name, setName] = useState(pilot.name);
  const [flightTime, setFlightTime] = useState(pilot.flightTime);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.updatePilot(pilot.pilotId, { name, flightTime: parseFloat(flightTime) });
      onSaved();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Edit Pilot</h2>
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Name</label>
            <input required value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Flight Hours</label>
            <input type="number" required value={flightTime} onChange={e => setFlightTime(e.target.value)} />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PilotsPage() {
  const [pilots, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flights, setAllFlights] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  async function load() {
    try {
      const [p, f] = await Promise.all([api.getPilots(), api.getFlights()]);
      setFlights(p);
      setAllFlights(f);
    } catch {
      setError('Failed to load pilots.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function deletePilot(id) {
    if (!confirm('Delete this pilot?')) return;
    await api.deletePilot(id);
    setFlights(p => p.filter(x => x.pilotId !== id));
  }

  function flightCountForPilot(pilotId) {
    return flights.filter(f => f.pilot?.pilotId === pilotId).length;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Pilot Management</h1>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <div className="table-card">
        <div className="table-card-header">Pilots ({pilots.length})</div>
        {loading ? <div className="loading">Loading...</div> : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Flight Hours</th>
                <th>Experience</th>
                <th>Assigned Flights</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pilots.map(p => {
                const count = flightCountForPilot(p.pilotId);
                let expBadge = 'badge-orange';
                let expLabel = 'Junior';
                if (p.flightTime >= 5000) { expBadge = 'badge-blue'; expLabel = 'Senior'; }
                if (p.flightTime >= 8000) { expBadge = 'badge-purple'; expLabel = 'Expert'; }
                return (
                  <tr key={p.pilotId}>
                    <td><strong>{p.name}</strong></td>
                    <td>{p.flightTime.toLocaleString()} hrs</td>
                    <td><span className={'badge ' + expBadge}>{expLabel}</span></td>
                    <td>{count} flight{count !== 1 ? 's' : ''}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-sm btn-secondary" onClick={() => setEditing(p)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => deletePilot(p.pilotId)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {pilots.length === 0 && <tr><td colSpan={5} className="empty">No pilots found.</td></tr>}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <EditPilotModal
          pilot={editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(); }}
        />
      )}
    </div>
  );
}
