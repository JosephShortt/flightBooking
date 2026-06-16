const BASE = '/api'

export async function getFlights() {
  const res = await fetch(`${BASE}/flights`)
  if (!res.ok) throw new Error('Failed to fetch flights')
  return res.json()
}

export async function createFlight(data) {
  const res = await fetch(`${BASE}/flights`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create flight')
  return res.json()
}

export async function bookFlight(flightCode, data) {
  const res = await fetch(`${BASE}/flights/${flightCode}/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Booking failed')
  }
  return res.json()
}

export async function deleteFlight(flightCode) {
  const res = await fetch(`${BASE}/flights/${flightCode}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete flight')
}
