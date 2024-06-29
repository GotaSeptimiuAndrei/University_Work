package webcourse.examweb;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "viewMenu", value = "/viewMenu")
public class ViewMenuServlet extends HttpServlet {
    private static final String dbUsername = "root";
    private static final String dbPassword = "";
    private static final String dbURL = "jdbc:mysql://127.0.0.1:3306/exam";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String menuType = request.getParameter("menuType");

        if ("Flights".equals(menuType)) {
            List<Flights> flights = searchFlights(request);
            for (Flights flight : flights) {
                System.out.println(flight.destinationCity);
            }
            request.setAttribute("flights", flights);
            request.getRequestDispatcher("viewFlights.jsp").forward(request, response);
        } else if ("Hotels".equals(menuType)) {
            List<Hotels> hotels = searchHotels(request);
            for (Hotels hotel : hotels) {
                System.out.println(hotel.city);
            }
            request.setAttribute("hotels", hotels);
            request.getRequestDispatcher("viewHotels.jsp").forward(request, response);
        }
    }

    private List<Flights> searchFlights(HttpServletRequest request) {
        List<String> info = (List<String>) request.getServletContext().getAttribute("infoUser");
        String username = info.get(0);
        String date = info.get(1);
        String destination = info.get(2);

        List<Flights> flights = new ArrayList<>();

        try  {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection(dbURL, dbUsername, dbPassword);
            if (connection != null) {
                System.out.println("Connected to the database successfully!");
            }
            String query = "SELECT * FROM Flights WHERE date = ? AND destinationCity = ? AND availableSeats > 0";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, date);
            statement.setString(2, destination);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                Flights flight = new Flights(
                        resultSet.getInt("flightId"),
                        resultSet.getString("date"),
                        resultSet.getString("destinationCity"),
                        resultSet.getInt("availableSeats")
                );
                flights.add(flight);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

        return flights;
    }

    private List<Hotels> searchHotels(HttpServletRequest request) {
        List<String> info = (List<String>) request.getServletContext().getAttribute("infoUser");
        String username = info.get(0);
        String date = info.get(1);
        String city = info.get(2);

        List<Hotels> hotels = new ArrayList<>();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection(dbURL, dbUsername, dbPassword);
            if (connection != null) {
                System.out.println("Connected to the database successfully!");
            }
            String query = "SELECT * FROM Hotels WHERE date = ? AND city = ? AND availableRooms > 0";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, date);
            statement.setString(2, city);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                Hotels hotel = new Hotels(
                        resultSet.getInt("hotelId"),
                        resultSet.getString("hotelName"),
                        resultSet.getString("date"),
                        resultSet.getString("city"),
                        resultSet.getInt("availableRooms")
                );
                hotels.add(hotel);
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        return hotels;
    }
}
