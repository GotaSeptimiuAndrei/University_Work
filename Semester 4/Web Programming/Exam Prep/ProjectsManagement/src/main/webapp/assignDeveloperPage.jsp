<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Assign Developer</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
<main id="assignToProject">
    <form action="assignDeveloper" method="post">
        <h2>Assign to Projects</h2>

        <label for="nameDeveloper"></label>
        <input
                type="text"
                id="nameDeveloper"
                name="nameDeveloper"
                placeholder="nameDeveloper"
                required
        />

        <br />

        <label for="namesOfProjects"></label>
        <input
                type="text"
                id="namesOfProjects"
                name="namesOfProjects"
                placeholder="namesOfProjects"
                required
        />

        <br />

        <input type="submit" value="Submit"/>

        <% if (request.getParameter("developerNotFound") != null) { %>
        <p class="error">Developer not found!</p>
        <% } %>

    </form>
</main>
</body>
</html>
