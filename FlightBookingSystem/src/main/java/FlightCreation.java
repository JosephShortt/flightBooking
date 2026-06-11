import java.util.Scanner;

public class FlightCreation {

    public Flight createFlight(){
        Scanner sc = new Scanner(System.in);
        String flCode;
        String departing;
        String destination;
        int capacity;
        String pilotID;
        String pilotName;
        double flightTime;

        System.out.println("**Flight Creation**");
        System.out.println("Enter the following flight details:");
        System.out.println("Flight Code:");
        flCode=sc.nextLine();
        System.out.println("Departing Airport:");
        departing=sc.nextLine();
        System.out.println("Destination Airport:");
        destination=sc.nextLine();
        System.out.println("Passeneger Capacity:");
        capacity = sc.nextInt();
        System.out.println("Pilot ID: ");
        pilotID = sc.nextLine();
        System.out.println("Pilot Name: ");
        pilotName = sc.nextLine();
        System.out.println("Pilot Flight Time: ");
        flightTime = sc.nextDouble();
        System.out.println("Flight Created Successfully!");
        Pilot pilot = new Pilot(pilotID,pilotName,flightTime);

        return new Flight(flCode,departing,destination,capacity,pilot);
    }
}
