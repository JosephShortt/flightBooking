import { useState, useEffect, useCallback } from 'react'
import { getFlights, deleteFlight } from './services/api'
import { isLoggedIn, getUser, clearAuth } from './services/authService'
import FlightTable from './components/FlightTable'
import CreateFlightModal from './components/CreateFlightModal'
import BookFlightModal from './components/BookFlightModal'
import MyBookings from './components/MyBookings'
import AuthModal from './components/AuthModal'
import Toast from './components/Toast'
import styles from './App.module.css'

export default function App() {
  const [user, setUser] = useState(() => isLoggedIn() ? getUser() : null)
  const [tab, setTab] = useState('flights')
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
    if (user) loadFlights()
  }, [user, loadFlights])

  const handleLogout = () => {
    clearAuth()
    setUser(null)
    setFlights([])
  }

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

  if (!user) {
    return <AuthModal onAuthenticated={setUser} />
  }

  return (
    <div>
      <header className={styles.header}>
        <h1>✈ Flight Booking System</h1>
        <div className={styles.headerRight}>
          <span className={styles.username}>Hello, {user.name}</span>
          <button className={styles.btnLogout} onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.navTabs}>
          <button
            className={tab === 'flights' ? styles.navTabActive : styles.navTab}
            onClick={() => setTab('flights')}
          >
            Flights
          </button>
          <button
            className={tab === 'bookings' ? styles.navTabActive : styles.navTab}
            onClick={() => setTab('bookings')}
          >
            My Bookings
          </button>
        </div>

        {tab === 'flights' && (
          <>
            <div className={styles.toolbar}>
              <h2>Available Flights</h2>
              <button className={styles.btnPrimary} onClick={() => setShowCreateModal(true)}>
                + Create Flight
              </button>
            </div>
            <FlightTable flights={flights} onBook={setFlightToBook} onDelete={handleDelete} />
          </>
        )}

        {tab === 'bookings' && (
          <>
            <div className={styles.toolbar}>
              <h2>My Bookings</h2>
            </div>
            <MyBookings />
          </>
        )}
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
