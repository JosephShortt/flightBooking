package com.joseph.flightbooking.repository;

import com.joseph.flightbooking.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    Optional<Flight> findByFlightCode(String flightCode);
}
