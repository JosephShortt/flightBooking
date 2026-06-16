package com.joseph.flightbooking.repository;

import com.joseph.flightbooking.model.Passenger;
import com.joseph.flightbooking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PassengerRepository extends JpaRepository<Passenger, UUID> {
    List<Passenger> findByUser(User user);
}
