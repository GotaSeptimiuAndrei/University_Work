package webcourse.projectsmanagement;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.*;
import java.time.LocalDate;

@WebServlet(name = "assignDeveloper", value = "/assignDeveloper")
public class AssignDeveloperServlet extends HttpServlet {
    private static final String dbUsername = "root";
    private static final String dbPassword = "";
    private static final String dbURL = "jdbc:mysql://127.0.0.1:3306/exam";

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String nameDeveloper = request.getParameter("nameDeveloper");
        String namesOfProjects = request.getParameter("namesOfProjects");

        Connection con = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection(dbURL, dbUsername, dbPassword);

            if (con != null) {
                System.out.println("Connected to the database successfully!");
            }

            // Step 1: Retrieve the developer ID
            PreparedStatement preparedStatement = con.prepareStatement("SELECT id FROM softwaredeveloper WHERE name = ?");
            preparedStatement.setString(1, nameDeveloper);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (!resultSet.next()) {
                response.sendRedirect("assignDeveloperPage.jsp?developerNotFound");
                return;
            }

            int developerId = resultSet.getInt("id");

            // Step 2: Parse the namesOfProjects parameter
            String[] projectNames = namesOfProjects.split(",");

            // Step 3: Update the members column for each project or create a new project if it doesn't exist
            for (String projectName : projectNames) {
                projectName = projectName.trim(); // Remove any leading or trailing spaces

                // Check if the project exists
                PreparedStatement checkProjectStatement = con.prepareStatement("SELECT id FROM Project WHERE name = ?");
                checkProjectStatement.setString(1, projectName);
                ResultSet projectResultSet = checkProjectStatement.executeQuery();

                if (projectResultSet.next()) {
                    // Project exists, update the members column
                    PreparedStatement updateStatement = con.prepareStatement(
                            "UPDATE Project SET members = CONCAT(IFNULL(members, ''), ',', ?, ',') WHERE name = ?"
                    );
                    updateStatement.setString(1, nameDeveloper);
                    updateStatement.setString(2, projectName);
                    updateStatement.executeUpdate();
                } else {
                    // Project does not exist, create a new project
                    PreparedStatement insertStatement = con.prepareStatement(
                            "INSERT INTO Project (projectManagerId, name, description, members) VALUES (?, ?, 'default', ?)"
                    );
                    insertStatement.setInt(1, developerId);
                    insertStatement.setString(2, projectName);
                    insertStatement.setString(3, nameDeveloper);
                    insertStatement.executeUpdate();
                }
            }

            response.sendRedirect("displayProjectsPage.jsp");

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
