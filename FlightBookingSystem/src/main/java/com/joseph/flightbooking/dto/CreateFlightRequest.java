package com.joseph.flightbooking.dto;

public record CreateFlightRequest(
        String departingAirport,
        String destinationAirport,
        int passengerCapacity,
        double price,
        String pilotName,
        double pilotFlightTime
) {}
