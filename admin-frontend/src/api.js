const BASE = 'http://localhost:8080/api';

function headers() {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function req(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  login: (email, password) => req('POST', '/auth/login', { email, password }),
  getStats: () => req('GET', '/admin/stats'),
  getUsers: () => req('GET', '/admin/users'),
  deleteUser: (id) => req('DELETE', `/admin/users/${id}`),
  getBookings: () => req('GET', '/admin/bookings'),
  getPilots: () => req('GET', '/admin/pilots'),
  updatePilot: (id, data) => req('PUT', `/admin/pilots/${id}`, data),
  deletePilot: (id) => req('DELETE', `/admin/pilots/${id}`),
  getFlights: () => req('GET', '/flights'),
  createFlight: (data) => req('POST', '/flights', data),
  deleteFlight: (code) => req('DELETE', `/flights/${code}`),
};
