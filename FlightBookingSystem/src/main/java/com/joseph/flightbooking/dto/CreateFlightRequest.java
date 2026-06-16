package com.joseph.flightbooking.dto;

import java.time.LocalDateTime;

public record CreateFlightRequest(
        String departingAirport,
        String destinationAirport,
        int passengerCapacity,
        double price,
        String pilotName,
        double pilotFlightTime,
        LocalDateTime departureDateTime
) {}
