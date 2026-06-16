package com.joseph.flightbooking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
public class Passenger {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID passengerId;

    private String name;
    private String address;
    private String phone;

    @ManyToOne
    @JoinColumn(name = "flight_id")
    @JsonIgnoreProperties({"passengers"})
    private Flight flight;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    public Passenger() {}

    public Passenger(String name, String phone) {
        this.name = name;
        this.phone = phone;
    }

    public UUID getPassengerId() { return passengerId; }
    public void setPassengerId(UUID passengerId) { this.passengerId = passengerId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Flight getFlight() { return flight; }
    public void setFlight(Flight flight) { this.flight = flight; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
