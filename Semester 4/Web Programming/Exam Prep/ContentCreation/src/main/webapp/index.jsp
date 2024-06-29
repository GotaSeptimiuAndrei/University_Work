<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <link rel="stylesheet" type="text/css" href="css/loginStyle.css" />
</head>

<body>
<main id="login">
    <form action="login" method="post">
        <h2>Login</h2>

        <label for="username"></label>
        <input
                type="text"
                id="username"
                name="username"
                placeholder="username"
                required
        />

        <br />

        <label for="role"></label>
        <input
                type="text"
                id="role"
                name="role"
                placeholder="role"
                required
        />

        <br />

        <label for="password"></label>
        <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                required
        />

        <br />

        <input type="submit" value="Submit"/>

        <% if (request.getParameter("invalidCredentials") != null) { %>
        <p class="error">Invalid username or role or password!</p>
        <% } %>

        <% if (request.getParameter("alreadyLoggedIn") != null) { %>
        <p class="error">You are already logged in!</p>
        <% } %>
    </form>
</main>
</body>
</html>
