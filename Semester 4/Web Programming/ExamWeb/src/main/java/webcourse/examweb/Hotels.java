package webcourse.examweb;

public class Hotels {
    int hotelId;
    String hotelName;
    String date;
    String city;
    int availableRooms;

    public Hotels(int hotelId, String hotelName, String date, String city, int availableRooms) {
        this.hotelId = hotelId;
        this.hotelName = hotelName;
        this.date = date;
        this.city = city;
        this.availableRooms = availableRooms;
    }

    public int getHotelId() {
        return hotelId;
    }

    public void setHotelId(int hotelId) {
        this.hotelId = hotelId;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getAvailableRooms() {
        return availableRooms;
    }

    public void setAvailableRooms(int availableRooms) {
        this.availableRooms = availableRooms;
    }
}
