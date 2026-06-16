package com.joseph.flightbooking.service;

import com.joseph.flightbooking.dto.MyBookingResponse;
import com.joseph.flightbooking.model.Flight;

import java.util.List;

public interface BookingService {
    Flight book(String flightCode);
    List<MyBookingResponse> getMyBookings();
}
