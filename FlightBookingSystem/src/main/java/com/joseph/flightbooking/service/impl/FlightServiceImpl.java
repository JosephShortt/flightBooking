package com.joseph.flightbooking.service.impl;

import com.joseph.flightbooking.dto.CreateFlightRequest;
import com.joseph.flightbooking.model.Flight;
import com.joseph.flightbooking.model.Pilot;
import com.joseph.flightbooking.repository.FlightRepository;
import com.joseph.flightbooking.service.FlightService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class FlightServiceImpl implements FlightService {

    private final FlightRepository flightRepository;

    public FlightServiceImpl(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    @Override
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    @Override
    public Flight getFlightByCode(String code) {
        return flightRepository.findByFlightCode(code)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Flight not found: " + code));
    }

    @Override
    public Flight createFlight(CreateFlightRequest request) {
        Pilot pilot = new Pilot(request.pilotName(), request.pilotFlightTime());
        Flight flight = new Flight(
                request.departingAirport(),
                request.destinationAirport(),
                request.passengerCapacity(),
                pilot,
                request.price(),
                request.departureDateTime()
        );
        Flight saved = flightRepository.save(flight);
        saved.setFlightCode("FL%04d".formatted(saved.getId()));
        return flightRepository.save(saved);
    }

    @Override
    public void deleteFlight(String code) {
        Flight flight = getFlightByCode(code);
        flightRepository.delete(flight);
    }
}
