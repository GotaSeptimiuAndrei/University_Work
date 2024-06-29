package webcourse.projectsmanagement;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.sql.*;
import java.util.HashSet;

@WebServlet(name="login", value="/login")
public class LoginServlet extends HttpServlet {
    private static final String dbUsername = "root";
    private static final String dbPassword = "";
    private static final String dbURL = "jdbc:mysql://127.0.0.1:3306/exam";

    @SuppressWarnings("unchecked")
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        System.out.println(username);
        System.out.println(password);

        HashSet<String> loggedInUsers = (HashSet<String>) getServletContext().getAttribute("users");
        if (loggedInUsers == null) {
            loggedInUsers = new HashSet<>();
            getServletContext().setAttribute("users", loggedInUsers);
        }

        if (checkLogin(username, password)) {
            if (loggedInUsers.contains(username)) {
                response.sendRedirect("index.jsp?alreadyLoggedIn");
                return;
            }

            HttpSession session = request.getSession();
            session.setAttribute("username", username);

            loggedInUsers.add(username);
            response.sendRedirect("displayProjectsPage.jsp");
        } else {
            response.sendRedirect("index.jsp?invalidCredentials");
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

            PreparedStatement preparedStatement = con.prepareStatement("SELECT * FROM softwaredeveloper WHERE name = ? AND password = ?");
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
