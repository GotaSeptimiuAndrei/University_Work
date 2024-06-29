package webcourse.projectsmanagement;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "displayProjectsDeveloper", value = "/displayProjectsDeveloper")
public class DisplayProjectsDeveloperServlet extends HttpServlet {
    private static final String dbUsername = "root";
    private static final String dbPassword = "";
    private static final String dbURL = "jdbc:mysql://127.0.0.1:3306/exam";
    private List<Project> projects = new ArrayList<>();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Connection con = null;
        projects.clear();
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection(dbURL, dbUsername, dbPassword);

            if (con != null) {
                System.out.println("Connected to the database successfully!");
            }

            PreparedStatement preparedStatement = con.prepareStatement("SELECT id FROM softwaredeveloper WHERE name = ?");
            preparedStatement.setString(1, req.getSession().getAttribute("username").toString());

            ResultSet resultSet = preparedStatement.executeQuery();
            int projectManagerId = -1;
            if (resultSet.next()) {
                projectManagerId = resultSet.getInt("id");
            }

            preparedStatement = con.prepareStatement("SELECT * FROM project WHERE projectManagerId = ?");
            preparedStatement.setInt(1, projectManagerId);
            ResultSet  resultSet1 = preparedStatement.executeQuery();

            while (resultSet1.next()) {
                int id = resultSet1.getInt("id");
                String name = resultSet1.getString("name");
                String description = resultSet1.getString("description");
                String members = resultSet1.getString("members");
                Project project = new Project(id, projectManagerId, name, description, members);
                projects.add(project);
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

        Gson gson = new Gson();
        String json = gson.toJson(projects);

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();
        out.print(json);
        out.flush();
    }
}
