package com.joseph.flightbooking.controller;

import com.joseph.flightbooking.dto.BookPassengerRequest;
import com.joseph.flightbooking.model.Flight;
import com.joseph.flightbooking.service.BookingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/flights")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/{code}/book")
    public Flight bookFlight(@PathVariable String code, @RequestBody BookPassengerRequest request) {
        return bookingService.book(code, request);
    }
}
