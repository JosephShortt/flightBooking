public class BookingServiceImpl implements BookingService{

    @Override
    public void book(Flight flight) {
        flight.setRemainingCapacity(flight.getRemainingCapacity()-1);
        System.out.println("Successfully booked Flight:"+flight.getFlightCode()
                + " - Flight remaining capacity: "+flight.getRemainingCapacity());
    }
}
