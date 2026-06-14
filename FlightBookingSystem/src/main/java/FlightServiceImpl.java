import java.util.List;
import java.util.Optional;
import java.util.Scanner;

public class FlightServiceImpl implements FlightService{
    @Override
    public void display(Flight flight) {
        System.out.println("\n\n");
        System.out.println("Flight Code: "+flight.getFlightCode());
        System.out.println("Departing Airport: "+flight.getDepartingAirport());
        System.out.println("Arrival Airport: "+flight.getDestinationAirport());
        System.out.println("Passenger Capacity: "+flight.getPassengerCapacity());
        System.out.println("**Pilot Details**");
        System.out.println("Pilot ID: "+flight.getPilot().getPilotID().toString());
        System.out.println("Pilot Name: "+flight.getPilot().getName());
        System.out.println("Flight Hours: "+flight.getPilot().getFlightTime());
        System.out.println("Remaining Capacity: "+flight.getRemainingCapacity());

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

    @Override
    public void displayAvailableFlights(List<Flight> flights) {
        System.out.println("Available Flights:");
        for (Flight f : flights){
            if(f.getRemainingCapacity()>0){
                String code = f.getFlightCode();
                System.out.println(code+": remaining capacity: "+f.getRemainingCapacity());
            }

        }
    }

    @Override
    public Flight getFlight(String code, List<Flight> flights) {
        for (Flight f : flights){
            String fCode = f.getFlightCode();
            if(code.equals(fCode)){
                return f;
            }
        }
        return null;
    }

}
