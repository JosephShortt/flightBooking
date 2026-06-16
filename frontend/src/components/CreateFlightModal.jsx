import { useState } from 'react'
import { createFlight } from '../services/api'
import styles from './Modal.module.css'

const EMPTY = {
  departingAirport: '',
  destinationAirport: '',
  price: '',
  passengerCapacity: '',
  pilotName: '',
  pilotFlightTime: '',
}

export default function CreateFlightModal({ onClose, onCreated, onError }) {
  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createFlight({
        departingAirport: form.departingAirport,
        destinationAirport: form.destinationAirport,
        price: parseFloat(form.price),
        passengerCapacity: parseInt(form.passengerCapacity),
        pilotName: form.pilotName,
        pilotFlightTime: parseFloat(form.pilotFlightTime),
      })
      onCreated()
    } catch (err) {
      onError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Create New Flight</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Departing Airport</label>
              <input value={form.departingAirport} onChange={set('departingAirport')} placeholder="e.g. Dublin" required />
            </div>
            <div className={styles.field}>
              <label>Destination Airport</label>
              <input value={form.destinationAirport} onChange={set('destinationAirport')} placeholder="e.g. London" required />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Price (€)</label>
              <input type="number" step="0.01" value={form.price} onChange={set('price')} placeholder="299.99" required />
            </div>
            <div className={styles.field}>
              <label>Passenger Capacity</label>
              <input type="number" value={form.passengerCapacity} onChange={set('passengerCapacity')} placeholder="150" required />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Pilot Name</label>
              <input value={form.pilotName} onChange={set('pilotName')} placeholder="Captain Smith" required />
            </div>
            <div className={styles.field}>
              <label>Pilot Flight Hours</label>
              <input type="number" step="0.1" value={form.pilotFlightTime} onChange={set('pilotFlightTime')} placeholder="5000" required />
            </div>
          </div>
          <div className={styles.footer}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.btnPrimary} disabled={loading}>
              {loading ? 'Creating…' : 'Create Flight'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
