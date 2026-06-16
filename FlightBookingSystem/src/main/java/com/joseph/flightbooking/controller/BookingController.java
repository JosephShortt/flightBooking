package com.joseph.flightbooking.controller;

import com.joseph.flightbooking.dto.MyBookingResponse;
import com.joseph.flightbooking.model.Flight;
import com.joseph.flightbooking.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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

    @DeleteMapping("/api/bookings/{bookingId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancelBooking(@PathVariable UUID bookingId) {
        bookingService.cancelBooking(bookingId);
    }
}
