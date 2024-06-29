<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="jakarta.servlet.http.HttpSession" %>
<html>
<head>
    <title>View Menu</title>
</head>
<body>
<main id="viewMenu">
    <h2>Select Reservation Type</h2>
    <form action="viewMenu" method="post">
        <input type="submit" name="menuType" value="Flights" />
        <input type="submit" name="menuType" value="Hotels" />
    </form>
</main>
</body>
</html>
