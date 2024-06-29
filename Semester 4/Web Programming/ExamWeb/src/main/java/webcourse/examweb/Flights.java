package webcourse.examweb;

public class Flights {
    int flightId;
    String date;
    String destinationCity;
    int availableSeats;

    public Flights(int id, String date, String destinationCity, int availableSeats) {
        this.flightId = id;
        this.date = date;
        this.destinationCity = destinationCity;
        this.availableSeats = availableSeats;
    }

    public int getFlightId() {
        return flightId;
    }

    public void setFlightId(int flightId) {
        this.flightId = flightId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDestinationCity() {
        return destinationCity;
    }

    public void setDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }
}
