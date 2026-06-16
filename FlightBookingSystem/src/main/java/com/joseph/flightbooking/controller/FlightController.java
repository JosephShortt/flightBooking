package com.joseph.flightbooking.controller;

import com.joseph.flightbooking.dto.CreateFlightRequest;
import com.joseph.flightbooking.model.Flight;
import com.joseph.flightbooking.service.FlightService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping
    public List<Flight> getAllFlights() {
        return flightService.getAllFlights();
    }

    @GetMapping("/{code}")
    public Flight getFlight(@PathVariable String code) {
        return flightService.getFlightByCode(code);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Flight createFlight(@RequestBody CreateFlightRequest request) {
        return flightService.createFlight(request);
    }

    @DeleteMapping("/{code}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFlight(@PathVariable String code) {
        flightService.deleteFlight(code);
    }
}
