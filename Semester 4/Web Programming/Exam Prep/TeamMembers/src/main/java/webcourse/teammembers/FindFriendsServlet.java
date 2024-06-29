package webcourse.teammembers;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "findFriend", value = "/findFriend")
public class FindFriendsServlet extends HttpServlet {
    private Connection getConnection() throws SQLException {
        // Update with your database connection details
        String jdbcURL = "jdbc:mysql://127.0.0.1:3306/exam";
        String dbUser = "root";
        String dbPassword = "";
        return DriverManager.getConnection(jdbcURL, dbUser, dbPassword);
    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = (String) req.getSession().getAttribute("username");
        String degreeParam = req.getParameter("degree");

        // Check if degreeParam is null or empty
        if (degreeParam == null || degreeParam.isEmpty()) {
            // Handle the case where degree is not provided
            // You might redirect back to the form or display an error message
            resp.sendRedirect(req.getContextPath() + "/findFriendsPage.jsp?error=degreeParamMissing");
            return;
        }

        int degree = Integer.parseInt(degreeParam);

        List<Player> players = new ArrayList<>();

        if (username != null && degree >= 1 && degree <= 3) {
            try (Connection connection = getConnection()) {
                int playerId = findPlayerIdByUsername(connection, username);
                if (playerId != -1) {
                    players = findNthDegreeRelations(connection, playerId, degree);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        req.setAttribute("players", players);
        req.getRequestDispatcher("/findFriendsPage.jsp").forward(req, resp);
    }


    private int findPlayerIdByUsername(Connection connection, String username) throws SQLException {
        String sql = "SELECT id FROM Player WHERE name = ?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, username);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return resultSet.getInt("id");
                }
            }
        }
        return -1;
    }

    private List<Player> findNthDegreeRelations(Connection connection, int playerId, int degree) throws SQLException {
        List<Player> players = new ArrayList<>();

        // Base SQL query to find immediate team members (1st degree)
        String sql = "SELECT DISTINCT p2.id, p2.name, p2.position " +
                "FROM Player p1 " +
                "JOIN TableMembers tm1 ON p1.id = tm1.idPlayer1 OR p1.id = tm1.idPlayer2 " +
                "JOIN TableMembers tm2 ON tm1.idTeam = tm2.idTeam " +
                "JOIN Player p2 ON (tm2.idPlayer1 = p2.id OR tm2.idPlayer2 = p2.id) " +
                "WHERE p1.id = ? AND p2.id != ?";

        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, playerId);
            statement.setInt(2, playerId);

            // For degrees 2 and 3, extend the SQL query
            if (degree >= 2) {
                sql += " UNION " +
                        "SELECT DISTINCT p3.id, p3.name, p3.position " +
                        "FROM Player p1 " +
                        "JOIN TableMembers tm1 ON p1.id = tm1.idPlayer1 OR p1.id = tm1.idPlayer2 " +
                        "JOIN TableMembers tm2 ON tm1.idTeam = tm2.idTeam " +
                        "JOIN Player p2 ON (tm2.idPlayer1 = p2.id OR tm2.idPlayer2 = p2.id) " +
                        "JOIN TableMembers tm3 ON (p2.id = tm3.idPlayer1 OR p2.id = tm3.idPlayer2) " +
                        "JOIN Player p3 ON (tm3.idPlayer1 = p3.id OR tm3.idPlayer2 = p3.id) " +
                        "WHERE p1.id = ? AND p3.id != ? AND p3.id != ?";
                statement.setInt(1, playerId);
                statement.setInt(2, playerId);
                statement.setInt(3, playerId);
            }

            // For degree 3, extend the SQL query further
            if (degree == 3) {
                sql += " UNION " +
                        "SELECT DISTINCT p4.id, p4.name, p4.position " +
                        "FROM Player p1 " +
                        "JOIN TableMembers tm1 ON p1.id = tm1.idPlayer1 OR p1.id = tm1.idPlayer2 " +
                        "JOIN TableMembers tm2 ON tm1.idTeam = tm2.idTeam " +
                        "JOIN Player p2 ON (tm2.idPlayer1 = p2.id OR tm2.idPlayer2 = p2.id) " +
                        "JOIN TableMembers tm3 ON (p2.id = tm3.idPlayer1 OR p2.id = tm3.idPlayer2) " +
                        "JOIN Player p3 ON (tm3.idPlayer1 = p3.id OR tm3.idPlayer2 = p3.id) " +
                        "JOIN TableMembers tm4 ON (p3.id = tm4.idPlayer1 OR p3.id = tm4.idPlayer2) " +
                        "JOIN Player p4 ON (tm4.idPlayer1 = p4.id OR tm4.idPlayer2 = p4.id) " +
                        "WHERE p1.id = ? AND p4.id != ? AND p4.id != ?";
                statement.setInt(1, playerId);
                statement.setInt(2, playerId);
                statement.setInt(3, playerId);
            }

            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    Player player = new Player(
                            resultSet.getInt("id"),
                            resultSet.getString("name"),
                            resultSet.getString("position")
                    );
                    players.add(player);
                }
            }
        }

        return players;
    }
}
