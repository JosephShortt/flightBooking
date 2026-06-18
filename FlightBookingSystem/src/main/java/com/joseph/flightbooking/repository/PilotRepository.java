package com.joseph.flightbooking.repository;

import com.joseph.flightbooking.model.Pilot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PilotRepository extends JpaRepository<Pilot, UUID> {
}
