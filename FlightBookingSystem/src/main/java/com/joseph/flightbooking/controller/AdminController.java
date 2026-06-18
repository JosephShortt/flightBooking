package com.joseph.flightbooking.controller;

import com.joseph.flightbooking.model.Passenger;
import com.joseph.flightbooking.model.Pilot;
import com.joseph.flightbooking.model.User;
import com.joseph.flightbooking.repository.PassengerRepository;
import com.joseph.flightbooking.repository.PilotRepository;
import com.joseph.flightbooking.repository.UserRepository;
import com.joseph.flightbooking.repository.FlightRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final PassengerRepository passengerRepository;
    private final PilotRepository pilotRepository;
    private final FlightRepository flightRepository;

    public AdminController(UserRepository userRepository,
                           PassengerRepository passengerRepository,
                           PilotRepository pilotRepository,
                           FlightRepository flightRepository) {
        this.userRepository = userRepository;
        this.passengerRepository = passengerRepository;
        this.pilotRepository = pilotRepository;
        this.flightRepository = flightRepository;
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        long totalFlights = flightRepository.count();
        long totalUsers = userRepository.count();
        long totalBookings = passengerRepository.count();
        double totalRevenue = passengerRepository.findAll().stream()
                .mapToDouble(p -> p.getFlight() != null ? p.getFlight().getPrice() : 0)
                .sum();
        double avgOccupancy = flightRepository.findAll().stream()
                .mapToDouble(f -> f.getPassengerCapacity() > 0
                        ? (double)(f.getPassengerCapacity() - f.getRemainingCapacity()) / f.getPassengerCapacity() * 100
                        : 0)
                .average().orElse(0);

        return Map.of(
                "totalFlights", totalFlights,
                "totalUsers", totalUsers,
                "totalBookings", totalBookings,
                "totalRevenue", Math.round(totalRevenue * 100.0) / 100.0,
                "avgOccupancy", Math.round(avgOccupancy * 10.0) / 10.0
        );
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/bookings")
    public List<Passenger> getAllBookings() {
        return passengerRepository.findAll();
    }

    @GetMapping("/pilots")
    public List<Pilot> getAllPilots() {
        return pilotRepository.findAll();
    }

    @PutMapping("/pilots/{id}")
    public ResponseEntity<Pilot> updatePilot(@PathVariable UUID id, @RequestBody Pilot updated) {
        return pilotRepository.findById(id).map(pilot -> {
            pilot.setName(updated.getName());
            pilot.setFlightTime(updated.getFlightTime());
            return ResponseEntity.ok(pilotRepository.save(pilot));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/pilots/{id}")
    public ResponseEntity<Void> deletePilot(@PathVariable UUID id) {
        pilotRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
