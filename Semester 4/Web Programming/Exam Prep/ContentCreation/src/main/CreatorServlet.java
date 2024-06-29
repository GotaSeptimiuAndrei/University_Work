package main;

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
import java.util.HashSet;
import java.util.List;

@WebServlet("/deleteContent")
public class CreatorServlet extends HttpServlet {
    private static final String dbUsername = "root";
    private static final String dbPassword = "";
    private static final String dbURL = "jdbc:mysql://127.0.0.1:3306/exam";
    private List<Content> contents = new ArrayList<>();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Connection con = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection(dbURL, dbUsername, dbPassword);

            if (con != null) {
                System.out.println("Connected to the database successfully!");
            }

            PreparedStatement preparedStatement = con.prepareStatement("SELECT userId FROM users WHERE username = ?");
            preparedStatement.setString(1, req.getSession().getAttribute("username").toString());

            ResultSet resultSet = preparedStatement.executeQuery();
            int creatorId = -1;
            if (resultSet.next()) {
                creatorId = resultSet.getInt("userId");
            }

            preparedStatement = con.prepareStatement("SELECT * FROM contents WHERE creatorId = ?");
            preparedStatement.setInt(1, creatorId);

            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                int id = resultSet.getInt("contentId");
                String title = resultSet.getString("title");
                String description = resultSet.getString("description");
                String url = resultSet.getString("url");
                Content content = new Content(id, creatorId, title, description, url);
                contents.add(content);
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

        // Convert the contents list to JSON
        Gson gson = new Gson();
        String json = gson.toJson(contents);

        // Write the JSON to the response
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();
        out.print(json);
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String idString= req.getParameter("contentId");
        int contentId = Integer.parseInt(idString);
        Connection con = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection(dbURL, dbUsername, dbPassword);

            if (con != null) {
                System.out.println("Connected to the database successfully!");
            }

            PreparedStatement preparedStatement = con.prepareStatement("DELETE FROM contents WHERE contentId = ?");
            preparedStatement.setInt(1, contentId);

            int affectedRows = preparedStatement.executeUpdate();
            if (affectedRows > 0) {
                System.out.println("Content deleted successfully!");
            } else {
                System.out.println("Failed to delete content. No content found with the given ID.");
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

        resp.sendRedirect("creatorPage.jsp");
    }
}
