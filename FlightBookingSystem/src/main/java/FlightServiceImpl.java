import java.util.Scanner;

public class FlightServiceImpl implements FlightService{
    @Override
    public void display(Flight flight) {
        System.out.println("Flight Code: "+flight.getFlightCode());
        System.out.println("Departing Airport: "+flight.getDepartingAirport());
        System.out.println("Arrival Airport: "+flight.getDestinationAirport());
        System.out.println("Passenger Capacity: "+flight.getPassengerCapacity());
        System.out.println("**Pilot Details**");
        System.out.println("Pilot ID: "+flight.getPilot().getPilotID().toString());
        System.out.println("Pilot Name: "+flight.getPilot().getName());
        System.out.println("Flight Hours: "+flight.getPilot().getFlightTime());
    }

    @Override
    public Flight createFlight() {
        Scanner sc = new Scanner(System.in);
        String departing;
        String destination;
        int capacity;
        String pilotName;
        double flightTime;

        System.out.println("**Flight Creation**");
        System.out.println("Enter the following flight details:");

        System.out.println("Departing Airport:");
        departing=sc.nextLine();

        System.out.println("Destination Airport:");
        destination=sc.nextLine();

        System.out.println("Passeneger Capacity:");
        capacity = sc.nextInt();

        sc.nextLine();

        System.out.println("Pilot Name: ");
        pilotName = sc.nextLine();

        System.out.println("Pilot Flight Time: ");
        flightTime = sc.nextDouble();

        System.out.println("Flight Created Successfully!");
        Pilot pilot = new Pilot(pilotName,flightTime);

        return new Flight(departing,destination,capacity,pilot);
    }
}
