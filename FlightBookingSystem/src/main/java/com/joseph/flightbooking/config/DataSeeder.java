package com.joseph.flightbooking.config;

import com.joseph.flightbooking.model.Flight;
import com.joseph.flightbooking.model.Pilot;
import com.joseph.flightbooking.repository.FlightRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class DataSeeder implements ApplicationRunner {

    private static final String[] AIRPORTS = {
        "Dublin", "London Heathrow", "Paris CDG", "Amsterdam Schiphol",
        "New York JFK", "Los Angeles", "Tokyo Narita", "Sydney",
        "Dubai", "Singapore", "Barcelona", "Rome Fiumicino",
        "Berlin Brandenburg", "Madrid Barajas", "Toronto Pearson",
        "Chicago O'Hare", "Miami", "Hong Kong", "Seoul Incheon", "Bangkok"
    };

    private static final String[] PILOT_NAMES = {
        "Captain James Walker", "Captain Sarah Chen", "Captain Michael O'Brien",
        "Captain Emma Rodriguez", "Captain David Kim", "Captain Liam Murphy",
        "Captain Olivia Hassan", "Captain Noah Patel", "Captain Ava Müller",
        "Captain Ethan Dubois"
    };

    private final FlightRepository flightRepository;

    public DataSeeder(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (flightRepository.count() > 0) return;

        Random rng = new Random();
        List<Flight> flights = new ArrayList<>();

        for (int i = 0; i < 20; i++) {
            int fromIdx = rng.nextInt(AIRPORTS.length);
            int toIdx;
            do { toIdx = rng.nextInt(AIRPORTS.length); } while (toIdx == fromIdx);

            LocalDateTime departure = LocalDateTime.now()
                    .plusDays(1 + rng.nextInt(30))
                    .withHour(rng.nextInt(24))
                    .withMinute(rng.nextBoolean() ? 0 : 30)
                    .withSecond(0)
                    .withNano(0);

            double price = Math.round((49 + rng.nextDouble() * 751) * 100.0) / 100.0;
            int capacity = 80 + rng.nextInt(171);
            String pilotName = PILOT_NAMES[rng.nextInt(PILOT_NAMES.length)];
            double flightHours = 1000 + Math.round(rng.nextDouble() * 9000);

            Pilot pilot = new Pilot(pilotName, flightHours);
            flights.add(new Flight(AIRPORTS[fromIdx], AIRPORTS[toIdx], capacity, pilot, price, departure));
        }

        List<Flight> saved = flightRepository.saveAll(flights);
        saved.forEach(f -> f.setFlightCode("FL%04d".formatted(f.getId())));
        flightRepository.saveAll(saved);
    }
}
