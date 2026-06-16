package com.joseph.flightbooking.service;

import com.joseph.flightbooking.dto.BookPassengerRequest;
import com.joseph.flightbooking.model.Flight;

public interface BookingService {
    Flight book(String flightCode, BookPassengerRequest request);
}
