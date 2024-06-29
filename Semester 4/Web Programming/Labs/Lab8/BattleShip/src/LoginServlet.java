import java.io.*;
import java.sql.*;
import java.util.HashSet;

import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final String dbUsername = "root";
    private static final String dbPassword = "";
    private static final String dbURL = "jdbc:mysql://127.0.0.1:3306/recipedb";

    @SuppressWarnings("unchecked")
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        HashSet<String> loggedInUsers = (HashSet<String>) getServletContext().getAttribute("users");
        if (loggedInUsers == null) {
            loggedInUsers = new HashSet<>();
            getServletContext().setAttribute("users", loggedInUsers);
        }

        if (checkLogin(username, password)) {
            if (loggedInUsers.contains(username)) {
                response.sendRedirect("login.jsp?alreadyLoggedIn");
                return;
            }

            HttpSession session = request.getSession();
            session.setAttribute("username", username);

            loggedInUsers.add(username);
            response.sendRedirect("game.jsp");
        } else {
            response.sendRedirect("login.jsp?invalidCredentials");
        }
    }

    private boolean checkLogin(String username, String password) {
        Connection con = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection(dbURL, dbUsername, dbPassword);

            if (con != null) {
                System.out.println("Connected to the database successfully!");
            }

            PreparedStatement preparedStatement = con.prepareStatement("SELECT * FROM users WHERE name = ? AND password = ?");
            preparedStatement.setString(1, username);
            preparedStatement.setString(2, password);

            ResultSet resultSet = preparedStatement.executeQuery();
            return resultSet.next();
        } catch (ClassNotFoundException | SQLException e) {
            System.out.println("Failed to connect to the database. Error: " + e.getMessage());
            return false;
        } finally {
            if (con != null) {
                try {
                    con.close();
                } catch (SQLException e) {
                    System.out.println("Failed to close the connection. Error: " + e.getMessage());
                }
            }
        }
    }
}
