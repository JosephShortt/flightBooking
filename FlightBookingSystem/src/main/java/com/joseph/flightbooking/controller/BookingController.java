package com.joseph.flightbooking.controller;

import com.joseph.flightbooking.dto.MyBookingResponse;
import com.joseph.flightbooking.model.Flight;
import com.joseph.flightbooking.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/api/flights/{code}/book")
    public Flight bookFlight(@PathVariable String code) {
        return bookingService.book(code);
    }

    @GetMapping("/api/bookings/me")
    public List<MyBookingResponse> getMyBookings() {
        return bookingService.getMyBookings();
    }
}
