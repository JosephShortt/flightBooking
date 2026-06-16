package com.joseph.flightbooking.service;

import com.joseph.flightbooking.dto.AuthResponse;
import com.joseph.flightbooking.dto.LoginRequest;
import com.joseph.flightbooking.dto.RegisterRequest;
import com.joseph.flightbooking.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    User getCurrentUser();
}
