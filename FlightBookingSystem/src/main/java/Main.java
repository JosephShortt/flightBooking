import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args){
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
                    break;
                case 2:
                    FlightCreation fc = new FlightCreation();
                    Flight flight = fc.createFlight();
                    flights.add(flight);
                    break;

                case 3:
                    for(Flight f : flights){
                        System.out.println("Flight Number: "+);
                    }
                case -1:
                    break;
            }
        }
        while (choice!=-1);

    }
}
