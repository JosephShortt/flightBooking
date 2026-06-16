package com.joseph.flightbooking.controller;

import com.joseph.flightbooking.dto.AuthResponse;
import com.joseph.flightbooking.dto.LoginRequest;
import com.joseph.flightbooking.dto.RegisterRequest;
import com.joseph.flightbooking.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegisterRequest request) {
        userService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}
