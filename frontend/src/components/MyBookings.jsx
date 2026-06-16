import { useState, useEffect, useCallback } from 'react'
import { getMyBookings, cancelBooking } from '../services/api'
import styles from './MyBookings.module.css'

function formatDate(dt) {
  if (!dt) return '—'
  return new Date(dt).toLocaleString('en-IE', { dateStyle: 'medium', timeStyle: 'short' })
}

export default function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(null)

  const load = useCallback(() => {
    setLoading(true)
    getMyBookings()
      .then(setBookings)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const handleCancel = async (bookingId, flightCode) => {
    if (!confirm(`Cancel your booking on flight ${flightCode}?`)) return
    setCancelling(bookingId)
    try {
      await cancelBooking(bookingId)
      load()
    } catch {
      alert('Failed to cancel booking.')
    } finally {
      setCancelling(null)
    }
  }

  if (loading) return <p className={styles.msg}>Loading your bookings…</p>

  if (bookings.length === 0) {
    return (
      <div className={styles.empty}>
        <strong>No bookings yet</strong>
        <p>Head to the Flights tab and book your first flight.</p>
      </div>
    )
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Flight</th>
          <th>From</th>
          <th>To</th>
          <th>Departure</th>
          <th>Arrival</th>
          <th>Price</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((b) => (
          <tr key={b.bookingId}>
            <td><strong>{b.flightCode}</strong></td>
            <td>{b.departingAirport}</td>
            <td>{b.destinationAirport}</td>
            <td>{formatDate(b.departureDateTime)}</td>
            <td>{formatDate(b.arrivalDateTime)}</td>
            <td>€{b.price.toFixed(2)}</td>
            <td><span className={styles.badge}>Confirmed</span></td>
            <td>
              <button
                className={styles.btnCancel}
                onClick={() => handleCancel(b.bookingId, b.flightCode)}
                disabled={cancelling === b.bookingId}
              >
                {cancelling === b.bookingId ? 'Cancelling…' : 'Cancel'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
