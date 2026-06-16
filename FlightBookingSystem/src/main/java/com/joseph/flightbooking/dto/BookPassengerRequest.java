package com.joseph.flightbooking.dto;

public record BookPassengerRequest(
        String name,
        String address,
        String phone
) {}
