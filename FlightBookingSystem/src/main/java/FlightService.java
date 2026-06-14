import java.util.List;
import java.util.Optional;

public interface FlightService {
    public void display(Flight flight);
    public Flight createFlight();
    public void displayAvailableFlights(List<Flight> flights);
    public Flight getFlight(String code, List<Flight> flights);
}
