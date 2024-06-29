package webcourse.examweb;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;
import java.util.List;

@WebServlet(name = "reserveFlight", value = "/reserveFlight")
public class ReserveFlightServlet extends HttpServlet {
    private static final String dbUsername = "root";
    private static final String dbPassword = "";
    private static final String dbURL = "jdbc:mysql://127.0.0.1:3306/exam";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int flightId = Integer.parseInt(request.getParameter("flightId"));
        List<String> info = (List<String>) request.getServletContext().getAttribute("infoUser");
        String username = info.get(0);

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection(dbURL, dbUsername, dbPassword);
            if (connection != null) {
                System.out.println("Connected to the database successfully!");
            }

            String updateSeatsQuery = "UPDATE Flights SET availableSeats = availableSeats - 1 WHERE flightId = ?";
            PreparedStatement updateSeatsStatement = connection.prepareStatement(updateSeatsQuery);
            updateSeatsStatement.setInt(1, flightId);
            updateSeatsStatement.executeUpdate();


            String insertReservationQuery = "INSERT INTO Reservations (person, type, idReservedResource) VALUES (?, ?, ?)";
            PreparedStatement insertReservationStatement = connection.prepareStatement(insertReservationQuery);
            insertReservationStatement.setString(1, username);
            insertReservationStatement.setString(2, "Flight");
            insertReservationStatement.setInt(3, flightId);
            insertReservationStatement.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

        response.sendRedirect("reservationSuccess.jsp");
    }
}
