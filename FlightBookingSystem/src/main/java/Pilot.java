public class Pilot {
    private String pilotID;
    private String name;
    private double flightTime;

    public Pilot(String pilotID, String name, double flightTime){
        this.pilotID = pilotID;
        this.name=name;
        this.flightTime=flightTime;
    }

    public String getPilotID() {
        return pilotID;
    }

    public void setPilotID(String pilotID) {
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
