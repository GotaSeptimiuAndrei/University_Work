package main;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.sql.*;
import java.util.HashSet;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final String dbUsername = "root";
    private static final String dbPassword = "";
    private static final String dbURL = "jdbc:mysql://127.0.0.1:3306/exam";

    @SuppressWarnings("unchecked")
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        String role = request.getParameter("role");
        String password = request.getParameter("password");

        HashSet<String> loggedInUsers = (HashSet<String>) getServletContext().getAttribute("users");
        if (loggedInUsers == null) {
            loggedInUsers = new HashSet<>();
            getServletContext().setAttribute("users", loggedInUsers);
        }

        if (checkLogin(username, role, password)) {
            if (loggedInUsers.contains(username)) {
                response.sendRedirect("login.jsp?alreadyLoggedIn");
                return;
            }

            HttpSession session = request.getSession();
            session.setAttribute("username", username);

            loggedInUsers.add(username);
            if (role.equals("creator"))
                response.sendRedirect("creatorPage.jsp");
            else
                response.sendRedirect("readerPage.jsp");
        } else {
            response.sendRedirect("login.jsp?invalidCredentials");
        }
    }

    private boolean checkLogin(String username, String role, String password) {
        Connection con = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection(dbURL, dbUsername, dbPassword);

            if (con != null) {
                System.out.println("Connected to the database successfully!");
            }

            PreparedStatement preparedStatement = con.prepareStatement("SELECT * FROM users WHERE username = ? AND password = ? AND role = ?");
            preparedStatement.setString(1, username);
            preparedStatement.setString(2, password);
            preparedStatement.setString(3, role);

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