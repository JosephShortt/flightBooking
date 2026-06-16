import { useState } from 'react'
import { login, register } from '../services/authService'
import styles from './AuthModal.module.css'

export default function AuthModal({ onAuthenticated }) {
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await login(form.email, form.password)
      onAuthenticated({ name: data.name, email: data.email })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form.name, form.email, form.password, form.phone)
      const data = await login(form.email, form.password)
      onAuthenticated({ name: data.name, email: data.email })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>✈ Flight Booking</h1>

        <div className={styles.tabs}>
          <button
            className={tab === 'login' ? styles.tabActive : styles.tab}
            onClick={() => { setTab('login'); setError('') }}
          >
            Login
          </button>
          <button
            className={tab === 'register' ? styles.tabActive : styles.tab}
            onClick={() => { setTab('register'); setError('') }}
          >
            Register
          </button>
        </div>

        {tab === 'login' ? (
          <form onSubmit={handleLogin}>
            <div className={styles.field}>
              <label>Email</label>
              <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required />
            </div>
            <div className={styles.field}>
              <label>Password</label>
              <input type="password" value={form.password} onChange={set('password')} placeholder="••••••••" required />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.btnSubmit} disabled={loading}>
              {loading ? 'Logging in…' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className={styles.field}>
              <label>Full Name</label>
              <input value={form.name} onChange={set('name')} placeholder="Jane Doe" required />
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required />
            </div>
            <div className={styles.field}>
              <label>Phone</label>
              <input value={form.phone} onChange={set('phone')} placeholder="+353 1 234 5678" required />
            </div>
            <div className={styles.field}>
              <label>Password</label>
              <input type="password" value={form.password} onChange={set('password')} placeholder="••••••••" required />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.btnSubmit} disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
