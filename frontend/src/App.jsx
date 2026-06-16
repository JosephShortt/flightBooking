import { useState, useEffect, useCallback } from 'react'
import { getFlights, deleteFlight } from './services/api'
import FlightTable from './components/FlightTable'
import CreateFlightModal from './components/CreateFlightModal'
import BookFlightModal from './components/BookFlightModal'
import Toast from './components/Toast'
import styles from './App.module.css'

export default function App() {
  const [flights, setFlights] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [flightToBook, setFlightToBook] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const loadFlights = useCallback(async () => {
    try {
      const data = await getFlights()
      setFlights(data)
    } catch {
      showToast('Could not load flights. Is the backend running?', 'error')
    }
  }, [])

  useEffect(() => {
    loadFlights()
  }, [loadFlights])

  const handleDelete = async (flightCode) => {
    if (!confirm(`Delete flight ${flightCode}?`)) return
    try {
      await deleteFlight(flightCode)
      showToast(`Flight ${flightCode} deleted.`)
      loadFlights()
    } catch {
      showToast('Failed to delete flight.', 'error')
    }
  }

  const handleFlightCreated = () => {
    setShowCreateModal(false)
    showToast('Flight created successfully!')
    loadFlights()
  }

  const handleBooked = (flightCode) => {
    setFlightToBook(null)
    showToast(`Booked onto flight ${flightCode}!`)
    loadFlights()
  }

  return (
    <div>
      <header className={styles.header}>
        <h1>✈ Flight Booking System</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.toolbar}>
          <h2>Flights</h2>
          <button className={styles.btnPrimary} onClick={() => setShowCreateModal(true)}>
            + Create Flight
          </button>
        </div>

        <FlightTable
          flights={flights}
          onBook={setFlightToBook}
          onDelete={handleDelete}
        />
      </main>

      {showCreateModal && (
        <CreateFlightModal
          onClose={() => setShowCreateModal(false)}
          onCreated={handleFlightCreated}
          onError={(msg) => showToast(msg, 'error')}
        />
      )}

      {flightToBook && (
        <BookFlightModal
          flight={flightToBook}
          onClose={() => setFlightToBook(null)}
          onBooked={handleBooked}
          onError={(msg) => showToast(msg, 'error')}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}
