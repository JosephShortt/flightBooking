package com.joseph.flightbooking.service;

import com.joseph.flightbooking.dto.CreateFlightRequest;
import com.joseph.flightbooking.model.Flight;

import java.util.List;

public interface FlightService {
    List<Flight> getAllFlights();
    Flight getFlightByCode(String code);
    Flight createFlight(CreateFlightRequest request);
    void deleteFlight(String code);
}
