const TOKEN_KEY = 'flight_token'
const USER_KEY = 'flight_user'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY) || 'null')
}

export function isLoggedIn() {
  return !!getToken()
}

export function saveAuth(token, user) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export async function login(email, password) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Invalid email or password')
  }
  const data = await res.json()
  saveAuth(data.token, { name: data.name, email: data.email })
  return data
}

export async function register(name, email, password, phone) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, phone }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Registration failed')
  }
}
