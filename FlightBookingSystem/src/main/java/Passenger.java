import java.util.UUID;

public class Passenger {
    private String name;
    private UUID passengerId;
    private String address;
    private String phoneHumber;

    public Passenger(String name, String address, String phoneHumber){
        this.name = name;
        this.address=address;
        this.phoneHumber=phoneHumber;
        this.passengerId = UUID.randomUUID();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UUID getPassengerId() {
        return passengerId;
    }

    public void setPassengerId(UUID passengerId) {
        this.passengerId = passengerId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneHumber() {
        return phoneHumber;
    }

    public void setPhoneHumber(String phoneHumber) {
        this.phoneHumber = phoneHumber;
    }
}
