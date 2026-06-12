import java.util.List;

public class Flight {
    private String flightCode;
    private String departingAirport;
    private String destinationAirport;
    private int passengerCapacity;
    private Pilot pilot;
    private static int flightCount = 1;

    public Flight(String departingAirport, String destinationAirport, int passengerCapacity, Pilot pilot){
        this.departingAirport = departingAirport;
        this.destinationAirport = destinationAirport;
        this.passengerCapacity = passengerCapacity;
        this.pilot=pilot;
        this.flightCode = "FL%04d".formatted(flightCount++);

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
