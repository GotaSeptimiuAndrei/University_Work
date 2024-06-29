<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="webcourse.examweb.Flights" %>
<%@ page import="java.util.List" %>
<html>
<head>
    <title>Available Flights</title>
</head>
<body>
<main id="viewFlights">
    <h2>Available Flights</h2>
    <table>
        <tr>
            <th>Flight ID</th>
            <th>Date</th>
            <th>Destination</th>
            <th>Available Seats</th>
            <th>Action</th>
        </tr>
        <%
            List<Flights> flights = (List<Flights>) request.getAttribute("flights");
            for (Flights flight : flights) {
        %>
        <tr>
            <td><%= flight.getFlightId() %></td>
            <td><%= flight.getDate() %></td>
            <td><%= flight.getDestinationCity() %></td>
            <td><%= flight.getAvailableSeats() %></td>
            <td>
                <form action="reserveFlight" method="post">
                    <input type="hidden" name="flightId" value="<%= flight.getFlightId() %>" />
                    <input type="submit" value="Reserve" />
                </form>
            </td>
        </tr>
        <% } %>
    </table>
</main>
</body>
</html>
