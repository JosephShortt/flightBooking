package com.joseph.flightbooking.service;

import com.joseph.flightbooking.dto.MyBookingResponse;
import com.joseph.flightbooking.model.Flight;

import java.util.List;
import java.util.UUID;

public interface BookingService {
    Flight book(String flightCode);
    List<MyBookingResponse> getMyBookings();
    void cancelBooking(UUID bookingId);
}
