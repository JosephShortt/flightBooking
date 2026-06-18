package com.joseph.flightbooking.config;

import com.joseph.flightbooking.model.Flight;
import com.joseph.flightbooking.model.Pilot;
import com.joseph.flightbooking.model.User;
import com.joseph.flightbooking.repository.FlightRepository;
import com.joseph.flightbooking.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(FlightRepository flightRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.flightRepository = flightRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (!userRepository.existsByEmail("admin@flightbooking.com")) {
            User admin = new User("Admin", "admin@flightbooking.com",
                    passwordEncoder.encode("admin123"), "000-000-0000", "ADMIN");
            userRepository.save(admin);
        }

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

            // Flight duration between 1 and 14 hours
            LocalDateTime arrival = departure.plusHours(1 + rng.nextInt(14))
                    .withMinute(rng.nextBoolean() ? 0 : 30);

            double price = Math.round((49 + rng.nextDouble() * 751) * 100.0) / 100.0;
            int capacity = 80 + rng.nextInt(171);
            String pilotName = PILOT_NAMES[rng.nextInt(PILOT_NAMES.length)];
            double flightHours = 1000 + Math.round(rng.nextDouble() * 9000);

            Pilot pilot = new Pilot(pilotName, flightHours);
            flights.add(new Flight(AIRPORTS[fromIdx], AIRPORTS[toIdx], capacity, pilot, price, departure, arrival));
        }

        List<Flight> saved = flightRepository.saveAll(flights);
        saved.forEach(f -> f.setFlightCode("FL%04d".formatted(f.getId())));
        flightRepository.saveAll(saved);
    }
}
