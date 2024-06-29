package webcourse.examweb;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "bookReservation", value = "/bookReservation")
public class BookReservationServlet extends HttpServlet {
    private static final String dbUsername = "root";
    private static final String dbPassword = "";
    private static final String dbURL = "jdbc:mysql://127.0.0.1:3306/exam";

    @SuppressWarnings("unchecked")
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        String date = request.getParameter("date");
        String destination = request.getParameter("destination");

        List<String> info = new ArrayList<>();
        info.add(username);
        info.add(date);
        info.add(destination);

        request.getServletContext().setAttribute("infoUser", info);
        response.sendRedirect("viewMenu.jsp");
    }
}
