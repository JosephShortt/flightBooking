# Flight Booking System

A full-stack flight booking application with a customer-facing frontend and a separate admin panel.

## Tech Stack

- **Backend:** Spring Boot 3, Java 21, Spring Security, JWT, H2 Database (in-memory)
- **Frontend:** React + Vite
- **Admin Panel:** React + Vite (separate app)

---

## Project Structure

```
flightBooking/
├── FlightBookingSystem/   # Spring Boot REST API (port 8080)
├── frontend/              # Customer frontend (port 5173)
└── admin-frontend/        # Admin panel (port 5174)
```

---

## Running the App

### 1. Backend

```bash
cd FlightBookingSystem
mvn spring-boot:run
```

API runs at `http://localhost:8080`. On startup, 20 random flights and an admin account are seeded automatically.

### 2. Customer Frontend

```bash
cd frontend
npm install
npm run dev
```

Opens at `http://localhost:5173`

### 3. Admin Panel

```bash
cd admin-frontend
npm install
npm run dev
```

Opens at `http://localhost:5174`

---

## Features

### Customer Frontend
- Register and log in with JWT authentication
- Browse all available flights
- Book a flight (seat reserved to your account)
- View and cancel your bookings

### Admin Panel
- **Dashboard** — overview stats: total flights, users, bookings, revenue, and average occupancy
- **Flight Management** — create and delete flights, view passenger manifest per flight
- **Bookings** — view all bookings across all users
- **Pilot Management** — view, edit, and delete pilots with experience badges
- **User Management** — view all registered users, see their booking history, delete accounts

---

## Admin Login

| Field    | Value                      |
|----------|----------------------------|
| Email    | admin@flightbooking.com    |
| Password | admin123                   |

---

## API Endpoints

### Auth
| Method | Endpoint             | Description        |
|--------|----------------------|--------------------|
| POST   | /api/auth/register   | Register a user    |
| POST   | /api/auth/login      | Login, returns JWT |

### Flights
| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | /api/flights          | List all flights     |
| GET    | /api/flights/{code}   | Get flight by code   |
| POST   | /api/flights          | Create a flight      |
| DELETE | /api/flights/{code}   | Delete a flight      |

### Bookings
| Method | Endpoint                       | Description              |
|--------|--------------------------------|--------------------------|
| POST   | /api/flights/{code}/book       | Book a flight            |
| GET    | /api/bookings/me               | Get current user bookings|
| DELETE | /api/bookings/{bookingId}      | Cancel a booking         |

### Admin (requires ADMIN role)
| Method | Endpoint                  | Description          |
|--------|---------------------------|----------------------|
| GET    | /api/admin/stats          | Dashboard statistics |
| GET    | /api/admin/users          | List all users       |
| DELETE | /api/admin/users/{id}     | Delete a user        |
| GET    | /api/admin/bookings       | List all bookings    |
| GET    | /api/admin/pilots         | List all pilots      |
| PUT    | /api/admin/pilots/{id}    | Update a pilot       |
| DELETE | /api/admin/pilots/{id}    | Delete a pilot       |

---

## Notes

- The database is in-memory (H2) and resets on every restart. See `application.properties` to switch to a persistent file-based database.
- The H2 console is available at `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:flightdb`).
