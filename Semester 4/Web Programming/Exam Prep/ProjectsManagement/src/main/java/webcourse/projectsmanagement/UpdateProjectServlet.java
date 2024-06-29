package webcourse.projectsmanagement;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@WebServlet(name = "updateProject", value = "/updateProject")
public class UpdateProjectServlet extends HttpServlet {
    private static final String dbUsername = "root";
    private static final String dbPassword = "";
    private static final String dbURL = "jdbc:mysql://127.0.0.1:3306/exam";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Retrieve form data
        String id = request.getParameter("id");
        String projectManagerId = request.getParameter("projectManagerId");
        String name = request.getParameter("name");
        String description = request.getParameter("description");
        String members = request.getParameter("members");

        // Database connection and update
        Connection conn = null;
        PreparedStatement ps = null;

        try {
            // Establish database connection
            conn = DriverManager.getConnection(dbURL, dbUsername, dbPassword);

            // Prepare SQL update statement
            String sql = "UPDATE project SET projectManagerId = ?, name = ?, description = ?, members = ? WHERE id = ?";
            ps = conn.prepareStatement(sql);
            ps.setInt(1, Integer.parseInt(projectManagerId));
            ps.setString(2, name);
            ps.setString(3, description);
            ps.setString(4, members);
            ps.setInt(5, Integer.parseInt(id));

            // Execute update
            int rowsUpdated = ps.executeUpdate();

            if (rowsUpdated > 0) {
                response.getWriter().write("Project updated successfully");
            } else {
                response.getWriter().write("Failed to update project");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            response.getWriter().write("Database error: " + e.getMessage());
        } finally {
            // Close resources
            try {
                if (ps != null) ps.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
