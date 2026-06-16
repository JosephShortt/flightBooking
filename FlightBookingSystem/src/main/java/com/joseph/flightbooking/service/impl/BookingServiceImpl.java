package com.joseph.flightbooking.service.impl;

import com.joseph.flightbooking.dto.BookPassengerRequest;
import com.joseph.flightbooking.model.Flight;
import com.joseph.flightbooking.model.Passenger;
import com.joseph.flightbooking.repository.FlightRepository;
import com.joseph.flightbooking.service.BookingService;
import com.joseph.flightbooking.service.FlightService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class BookingServiceImpl implements BookingService {

    private final FlightService flightService;
    private final FlightRepository flightRepository;

    public BookingServiceImpl(FlightService flightService, FlightRepository flightRepository) {
        this.flightService = flightService;
        this.flightRepository = flightRepository;
    }

    @Override
    public Flight book(String flightCode, BookPassengerRequest request) {
        Flight flight = flightService.getFlightByCode(flightCode);

        if (flight.getRemainingCapacity() <= 0) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Flight " + flightCode + " is fully booked");
        }

        Passenger passenger = new Passenger(request.name(), request.address(), request.phone());
        passenger.setFlight(flight);
        flight.getPassengers().add(passenger);
        flight.setRemainingCapacity(flight.getRemainingCapacity() - 1);

        return flightRepository.save(flight);
    }
}
