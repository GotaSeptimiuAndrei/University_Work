<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="webcourse.examweb.Hotels" %>
<%@ page import="java.util.List" %>
<html>
<head>
    <title>Available Hotels</title>
</head>
<body>
<main id="viewHotels">
    <h2>Available Hotels</h2>
    <table>
        <tr>
            <th>Hotel ID</th>
            <th>Hotel Name</th>
            <th>Date</th>
            <th>City</th>
            <th>Available Rooms</th>
            <th>Action</th>
        </tr>
        <%
            List<Hotels> hotels = (List<Hotels>) request.getAttribute("hotels");
            for (Hotels hotel : hotels) {
        %>
        <tr>
            <td><%= hotel.getHotelId() %></td>
            <td><%= hotel.getHotelName() %></td>
            <td><%= hotel.getDate() %></td>
            <td><%= hotel.getCity() %></td>
            <td><%= hotel.getAvailableRooms() %></td>
            <td>
                <form action="reserveHotel" method="post">
                    <input type="hidden" name="hotelId" value="<%= hotel.getHotelId() %>" />
                    <input type="submit" value="Reserve" />
                </form>
            </td>
        </tr>
        <% } %>
    </table>
</main>
</body>
</html>
