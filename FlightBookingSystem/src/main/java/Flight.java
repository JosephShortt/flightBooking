import java.util.List;

public class Flight {
    private String flightCode;
    private String departingAirport;
    private String destinationAirport;
    private int passengerCapacity;
    private Pilot pilot;
    private static int flightCount = 1;
    private int remainingCapacity = passengerCapacity;
    private double price;
    private static List<Passenger> passengers;

    public Flight(String departingAirport, String destinationAirport, int passengerCapacity, Pilot pilot, double price){
        this.departingAirport = departingAirport;
        this.destinationAirport = destinationAirport;
        this.passengerCapacity = passengerCapacity;
        this.pilot=pilot;
        this.flightCode = "FL%04d".formatted(flightCount++);
        this.remainingCapacity = passengerCapacity;
        this.price=price;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public List<Passenger> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<Passenger> passengers) {
        this.passengers = passengers;
    }

    public int getRemainingCapacity() {
        return remainingCapacity;
    }

    public void setRemainingCapacity(int remainingCapacity) {
        this.remainingCapacity = remainingCapacity;
    }

    public static int getFlightCount() {
        return flightCount;
    }

    public static void setFlightCount(int flightCount) {
        Flight.flightCount = flightCount;
    }

    public String getFlightCode() {
        return flightCode;
    }

    public void setFlightCode(String flightCode) {
        this.flightCode = flightCode;
    }

    public String getDepartingAirport() {
        return departingAirport;
    }

    public void setDepartingAirport(String departingAirport) {
        this.departingAirport = departingAirport;
    }

    public String getDestinationAirport() {
        return destinationAirport;
    }

    public void setDestinationAirport(String destinationAirport) {
        this.destinationAirport = destinationAirport;
    }

    public int getPassengerCapacity() {
        return passengerCapacity;
    }

    public void setPassengerCapacity(int passengerCapacity) {
        this.passengerCapacity = passengerCapacity;
    }

    public Pilot getPilot() {
        return pilot;
    }

    public void setPilot(Pilot pilot) {
        this.pilot = pilot;
    }
}
