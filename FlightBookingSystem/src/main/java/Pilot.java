import java.util.UUID;

public class Pilot {
    private UUID pilotID;
    private String name;
    private double flightTime;

    public Pilot(String name, double flightTime){
        this.pilotID = UUID.randomUUID();
        this.name=name;
        this.flightTime=flightTime;
    }

    public UUID getPilotID() {
        return pilotID;
    }

    public void setPilotID(UUID pilotID) {
        this.pilotID = pilotID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getFlightTime() {
        return flightTime;
    }

    public void setFlightTime(double flightTime) {
        this.flightTime = flightTime;
    }
}
