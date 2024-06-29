<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>

<body>
<main id="bookReservation">
    <form action="bookReservation" method="post">
        <h2>Book reservation</h2>

        <label for="username"></label>
        <input
                type="text"
                id="username"
                name="username"
                placeholder="username"
                required
        />

        <br />

        <label for="date"></label>
        <input
                type="text"
                id="date"
                name="date"
                placeholder="date"
                required
        />

        <br />

        <label for="destination"></label>
        <input
                type="text"
                id="destination"
                name="destination"
                placeholder="destination"
                required
        />

        <br />

        <input type="submit" value="BeginReservation"/>

    </form>
</main>
</body>
</html>
