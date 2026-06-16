package com.joseph.flightbooking.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String flightCode;
    private String departingAirport;
    private String destinationAirport;
    private int passengerCapacity;
    private int remainingCapacity;
    private double price;
    private LocalDateTime departureDateTime;
    private LocalDateTime arrivalDateTime;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "pilot_id")
    private Pilot pilot;

    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"flight", "user"})
    private List<Passenger> passengers = new ArrayList<>();

    public Flight() {}

    public Flight(String departingAirport, String destinationAirport, int passengerCapacity,
                  Pilot pilot, double price, LocalDateTime departureDateTime, LocalDateTime arrivalDateTime) {
        this.departingAirport = departingAirport;
        this.destinationAirport = destinationAirport;
        this.passengerCapacity = passengerCapacity;
        this.remainingCapacity = passengerCapacity;
        this.pilot = pilot;
        this.price = price;
        this.departureDateTime = departureDateTime;
        this.arrivalDateTime = arrivalDateTime;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFlightCode() { return flightCode; }
    public void setFlightCode(String flightCode) { this.flightCode = flightCode; }

    public String getDepartingAirport() { return departingAirport; }
    public void setDepartingAirport(String departingAirport) { this.departingAirport = departingAirport; }

    public String getDestinationAirport() { return destinationAirport; }
    public void setDestinationAirport(String destinationAirport) { this.destinationAirport = destinationAirport; }

    public int getPassengerCapacity() { return passengerCapacity; }
    public void setPassengerCapacity(int passengerCapacity) { this.passengerCapacity = passengerCapacity; }

    public int getRemainingCapacity() { return remainingCapacity; }
    public void setRemainingCapacity(int remainingCapacity) { this.remainingCapacity = remainingCapacity; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public Pilot getPilot() { return pilot; }
    public void setPilot(Pilot pilot) { this.pilot = pilot; }

    public LocalDateTime getDepartureDateTime() { return departureDateTime; }
    public void setDepartureDateTime(LocalDateTime departureDateTime) { this.departureDateTime = departureDateTime; }

    public LocalDateTime getArrivalDateTime() { return arrivalDateTime; }
    public void setArrivalDateTime(LocalDateTime arrivalDateTime) { this.arrivalDateTime = arrivalDateTime; }

    public List<Passenger> getPassengers() { return passengers; }
    public void setPassengers(List<Passenger> passengers) { this.passengers = passengers; }
}
