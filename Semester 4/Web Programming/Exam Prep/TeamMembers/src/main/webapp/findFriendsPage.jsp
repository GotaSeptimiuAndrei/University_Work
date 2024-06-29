<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Find Friends</title>
</head>
<body>
<h2>Find Relations</h2>
<form method="get" action="findFriend">
    <label for="degree">Enter degree (1, 2, 3):</label>
    <input type="number" id="degree" name="degree" min="1" max="3" required>
    <button type="submit">Find</button>
</form>

<div id="results">
    <h3>Results:</h3>
    <ul>
        <c:forEach var="player" items="${players}">
            <li>${player.name}</li>
        </c:forEach>
    </ul>
</div>

</body>
</html>
