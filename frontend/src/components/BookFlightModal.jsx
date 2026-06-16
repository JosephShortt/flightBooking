import { useState } from 'react'
import { bookFlight } from '../services/api'
import styles from './Modal.module.css'

const EMPTY = { name: '', address: '', phone: '' }

export default function BookFlightModal({ flight, onClose, onBooked, onError }) {
  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await bookFlight(flight.flightCode, form)
      onBooked(flight.flightCode)
    } catch (err) {
      onError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Book Flight {flight.flightCode}</h3>
        <p className={styles.subtitle}>
          {flight.departingAirport} → {flight.destinationAirport} &nbsp;|&nbsp; €{flight.price.toFixed(2)} &nbsp;|&nbsp; {flight.remainingCapacity} seats left
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Full Name</label>
            <input value={form.name} onChange={set('name')} placeholder="Jane Doe" required />
          </div>
          <div className={styles.field}>
            <label>Address</label>
            <input value={form.address} onChange={set('address')} placeholder="123 Main St, Dublin" required />
          </div>
          <div className={styles.field}>
            <label>Phone Number</label>
            <input value={form.phone} onChange={set('phone')} placeholder="+353 1 234 5678" required />
          </div>
          <div className={styles.footer}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.btnSuccess} disabled={loading}>
              {loading ? 'Booking…' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
