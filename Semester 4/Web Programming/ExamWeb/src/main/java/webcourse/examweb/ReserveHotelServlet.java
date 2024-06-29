package webcourse.examweb;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;
import java.util.List;

@WebServlet(name = "reserveHotel", value = "/reserveHotel")
public class ReserveHotelServlet extends HttpServlet {
    private static final String dbUsername = "root";
    private static final String dbPassword = "";
    private static final String dbURL = "jdbc:mysql://127.0.0.1:3306/exam";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int hotelId = Integer.parseInt(request.getParameter("hotelId"));
        List<String> info = (List<String>) request.getServletContext().getAttribute("infoUser");
        String username = info.get(0);

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection(dbURL, dbUsername, dbPassword);

            // Decrement available rooms
            String updateRoomsQuery = "UPDATE Hotels SET availableRooms = availableRooms - 1 WHERE hotelId = ?";
            PreparedStatement updateRoomsStatement = connection.prepareStatement(updateRoomsQuery);
            updateRoomsStatement.setInt(1, hotelId);
            updateRoomsStatement.executeUpdate();

            // Insert into Reservations
            String insertReservationQuery = "INSERT INTO Reservations (person, type, idReservedResource) VALUES (?, ?, ?)";
            PreparedStatement insertReservationStatement = connection.prepareStatement(insertReservationQuery);
            insertReservationStatement.setString(1, username);
            insertReservationStatement.setString(2, "Hotel");
            insertReservationStatement.setInt(3, hotelId);
            insertReservationStatement.executeUpdate();

        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        response.sendRedirect("reservationSuccess.jsp");
    }
}

