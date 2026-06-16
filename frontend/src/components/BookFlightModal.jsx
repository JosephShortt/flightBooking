import { useState } from 'react'
import { bookFlight } from '../services/api'
import styles from './Modal.module.css'

function formatDate(dt) {
  if (!dt) return '—'
  return new Date(dt).toLocaleString('en-IE', { dateStyle: 'medium', timeStyle: 'short' })
}

export default function BookFlightModal({ flight, onClose, onBooked, onError }) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await bookFlight(flight.flightCode)
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
        <h3>Confirm Booking</h3>
        <p className={styles.subtitle}>
          {flight.departingAirport} → {flight.destinationAirport}
        </p>
        <div className={styles.confirmDetails}>
          <div><span>Departure</span><strong>{formatDate(flight.departureDateTime)}</strong></div>
          <div><span>Arrival</span><strong>{formatDate(flight.arrivalDateTime)}</strong></div>
          <div><span>Price</span><strong>€{flight.price.toFixed(2)}</strong></div>
          <div><span>Seats left</span><strong>{flight.remainingCapacity}</strong></div>
        </div>
        <p className={styles.confirmNote}>Your seat will be booked using your account details.</p>
        <div className={styles.footer}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>Cancel</button>
          <button className={styles.btnSuccess} onClick={handleConfirm} disabled={loading}>
            {loading ? 'Booking…' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  )
}
