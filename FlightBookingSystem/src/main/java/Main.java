import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;

public class Main {
    public static void main(String[] args){
        FlightService flightService = new FlightServiceImpl();
        Scanner sc = new Scanner(System.in);
        List<Flight> flights = new ArrayList<>();

        int choice;
        do{
            System.out.println("FLIGHT BOOKING SYSTEM");
            System.out.println("Console Options:");
            System.out.println("1. Book a flight");
            System.out.println("2. Create a flight");
            System.out.println("3. List Flights");
            System.out.println("-1. exit");

            choice = sc.nextInt();
            switch (choice){
                case 1:
                    flightService.displayAvailableFlights(flights);
                    BookingService bookingService = new BookingServiceImpl();
                    sc.nextLine();
                    System.out.println("Enter flight code of the flight you want to book:");
                    String code = sc.nextLine();
                    Flight flight = flightService.getFlight(code,flights);

                    String name;
                    String address;
                    String phone;

                    System.out.println("Enter your name:");
                    name = sc.nextLine();
                    System.out.println("Enter address:");
                    address = sc.nextLine();
                    System.out.println("Enter phone number:");
                    phone = sc.nextLine();
                    Passenger p = new Passenger(name,address,phone);

                    flight.getPassengers().add(p);
                    bookingService.book(flight);
                    break;
                case 2:
                    Flight newFlight = flightService.createFlight();
                    flights.add(newFlight);
                    break;

                case 3:
                    for(Flight f : flights){
                        flightService.display(f);

                        System.out.println("**Passengers**");
                        for (Passenger passenger : f.getPassengers()){
                            System.out.println("Passenegr Name: "+passenger.getName());
                            System.out.println("Passenger address: "+passenger.getAddress());
                            System.out.println("Passenger phone number: "+passenger.getPhoneHumber());
                        }
                    }
                case -1:
                    break;
            }
        }
        while (choice!=-1);

    }
}
