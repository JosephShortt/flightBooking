package com.joseph.flightbooking.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record MyBookingResponse(
        UUID bookingId,
        String flightCode,
        String departingAirport,
        String destinationAirport,
        LocalDateTime departureDateTime,
        double price
) {}
