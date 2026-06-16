import styles from './FlightTable.module.css'

function formatDate(dt) {
  if (!dt) return '—'
  return new Date(dt).toLocaleString('en-IE', { dateStyle: 'short', timeStyle: 'short' })
}

export default function FlightTable({ flights, onBook, onDelete }) {
  if (flights.length === 0) {
    return (
      <div className={styles.emptyState}>
        <strong>No flights yet</strong>
        <p>Click "Create Flight" to add one.</p>
      </div>
    )
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Code</th>
          <th>From</th>
          <th>To</th>
          <th>Departure</th>
          <th>Arrival</th>
          <th>Price</th>
          <th>Pilot</th>
          <th>Capacity</th>
          <th>Availability</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {flights.map((flight) => (
          <FlightRow
            key={flight.flightCode}
            flight={flight}
            onBook={onBook}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  )
}

function FlightRow({ flight, onBook, onDelete }) {
  const full = flight.remainingCapacity <= 0

  return (
    <tr>
      <td><strong>{flight.flightCode}</strong></td>
      <td>{flight.departingAirport}</td>
      <td>{flight.destinationAirport}</td>
      <td>{formatDate(flight.departureDateTime)}</td>
      <td>{formatDate(flight.arrivalDateTime)}</td>
      <td>€{flight.price.toFixed(2)}</td>
      <td>{flight.pilot.name} ({flight.pilot.flightTime}h)</td>
      <td>{flight.passengerCapacity}</td>
      <td>
        <span className={full ? styles.badgeFull : styles.badgeAvailable}>
          {full ? 'Full' : `${flight.remainingCapacity} seats`}
        </span>
      </td>
      <td>
        <div className={styles.actions}>
          <button
            className={styles.btnBook}
            onClick={() => onBook(flight)}
            disabled={full}
          >
            Book
          </button>
          <button
            className={styles.btnDelete}
            onClick={() => onDelete(flight.flightCode)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}
