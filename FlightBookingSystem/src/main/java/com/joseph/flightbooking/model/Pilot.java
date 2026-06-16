package com.joseph.flightbooking.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
public class Pilot {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID pilotId;

    private String name;
    private double flightTime;

    public Pilot() {}

    public Pilot(String name, double flightTime) {
        this.name = name;
        this.flightTime = flightTime;
    }

    public UUID getPilotId() { return pilotId; }
    public void setPilotId(UUID pilotId) { this.pilotId = pilotId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getFlightTime() { return flightTime; }
    public void setFlightTime(double flightTime) { this.flightTime = flightTime; }
}
