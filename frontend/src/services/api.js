import { getToken } from './authService'

const BASE = '/api'

function authHeaders(includeContentType = false) {
  const token = getToken()
  return {
    ...(includeContentType ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export async function getFlights() {
  const res = await fetch(`${BASE}/flights`)
  if (!res.ok) throw new Error('Failed to fetch flights')
  return res.json()
}

export async function createFlight(data) {
  const res = await fetch(`${BASE}/flights`, {
    method: 'POST',
    headers: authHeaders(true),
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create flight')
  return res.json()
}

export async function bookFlight(flightCode) {
  const res = await fetch(`${BASE}/flights/${flightCode}/book`, {
    method: 'POST',
    headers: authHeaders(),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Booking failed')
  }
  return res.json()
}

export async function deleteFlight(flightCode) {
  const res = await fetch(`${BASE}/flights/${flightCode}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Failed to delete flight')
}

export async function getMyBookings() {
  const res = await fetch(`${BASE}/bookings/me`, {
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Failed to fetch bookings')
  return res.json()
}
