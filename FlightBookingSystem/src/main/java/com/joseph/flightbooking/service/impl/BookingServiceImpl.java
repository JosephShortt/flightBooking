package com.joseph.flightbooking.service.impl;

import com.joseph.flightbooking.dto.MyBookingResponse;
import com.joseph.flightbooking.model.Flight;
import com.joseph.flightbooking.model.Passenger;
import com.joseph.flightbooking.model.User;
import com.joseph.flightbooking.repository.FlightRepository;
import com.joseph.flightbooking.repository.PassengerRepository;
import com.joseph.flightbooking.service.BookingService;
import com.joseph.flightbooking.service.FlightService;
import com.joseph.flightbooking.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class BookingServiceImpl implements BookingService {

    private final FlightService flightService;
    private final FlightRepository flightRepository;
    private final PassengerRepository passengerRepository;
    private final UserService userService;

    public BookingServiceImpl(FlightService flightService, FlightRepository flightRepository,
                              PassengerRepository passengerRepository, UserService userService) {
        this.flightService = flightService;
        this.flightRepository = flightRepository;
        this.passengerRepository = passengerRepository;
        this.userService = userService;
    }

    @Override
    public Flight book(String flightCode) {
        Flight flight = flightService.getFlightByCode(flightCode);
        User currentUser = userService.getCurrentUser();

        if (flight.getRemainingCapacity() <= 0) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Flight " + flightCode + " is fully booked");
        }

        boolean alreadyBooked = flight.getPassengers().stream()
                .anyMatch(p -> p.getUser() != null && p.getUser().getId().equals(currentUser.getId()));
        if (alreadyBooked) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "You have already booked this flight");
        }

        Passenger passenger = new Passenger(currentUser.getName(), currentUser.getPhone());
        passenger.setFlight(flight);
        passenger.setUser(currentUser);
        flight.getPassengers().add(passenger);
        flight.setRemainingCapacity(flight.getRemainingCapacity() - 1);

        return flightRepository.save(flight);
    }

    @Override
    public List<MyBookingResponse> getMyBookings() {
        User currentUser = userService.getCurrentUser();
        return passengerRepository.findByUser(currentUser).stream()
                .map(p -> new MyBookingResponse(
                        p.getPassengerId(),
                        p.getFlight().getFlightCode(),
                        p.getFlight().getDepartingAirport(),
                        p.getFlight().getDestinationAirport(),
                        p.getFlight().getDepartureDateTime(),
                        p.getFlight().getPrice()
                ))
                .toList();
    }

    @Override
    public void cancelBooking(UUID bookingId) {
        User currentUser = userService.getCurrentUser();
        Passenger passenger = passengerRepository.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        if (!passenger.getUser().getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not your booking");
        }

        Flight flight = passenger.getFlight();
        flight.getPassengers().remove(passenger);
        flight.setRemainingCapacity(flight.getRemainingCapacity() + 1);
        flightRepository.save(flight);
        passengerRepository.delete(passenger);
    }
}
