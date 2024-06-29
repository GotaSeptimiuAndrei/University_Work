package webcourse.teammembers;


import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

@WebServlet(name = "searchPlayer", value = "/searchPlayer")
public class SearchPlayerServlet extends HttpServlet {
    private static final String dbUsername = "root";
    private static final String dbPassword = "";
    private static final String dbURL = "jdbc:mysql://127.0.0.1:3306/exam";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String search = request.getParameter("search");
        response.setContentType("text/html;charset=UTF-8");
        Connection con = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection(dbURL, dbUsername, dbPassword);

            if (con != null) {
                System.out.println("Connected to the database successfully!");
            }

            PrintWriter out = response.getWriter();
            String sql = "SELECT name FROM Player WHERE name LIKE ?";
            PreparedStatement statement = con.prepareStatement(sql);
            statement.setString(1, "%" + search + "%");
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                out.println("<p>" + resultSet.getString("name") + "</p>");
            }

        } catch (ClassNotFoundException | SQLException e) {
            System.out.println("Failed to connect to the database. Error: " + e.getMessage());
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
