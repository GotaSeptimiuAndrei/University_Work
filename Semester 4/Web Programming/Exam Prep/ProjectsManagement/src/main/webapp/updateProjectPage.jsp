<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.sql.*, javax.naming.*, javax.sql.*" %>
<html>
<head>
    <title>Update Project</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
<h2>Update Project</h2>

<%
    String projectId = request.getParameter("projectId");
    String projectManagerId = "";
    String name = "";
    String description = "";
    String members = "";
    String dbUsername = "root";
    String dbPassword = "";
    String dbURL = "jdbc:mysql://127.0.0.1:3306/exam";

    try {
        Connection conn = null;
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection(dbURL, dbUsername, dbPassword);

        PreparedStatement ps = conn.prepareStatement("SELECT * FROM project WHERE id = ?");
        ps.setInt(1, Integer.parseInt(projectId));
        ResultSet rs = ps.executeQuery();
        if (rs.next()) {
            projectManagerId = rs.getString("projectManagerId");
            name = rs.getString("name");
            description = rs.getString("description");
            members = rs.getString("members");
        }
        rs.close();
        ps.close();
        conn.close();
    } catch (Exception e) {
        e.printStackTrace();
    }
%>

<form id="updateProjectForm">
    <input type="hidden" name="id" value="<%= projectId %>">
    <label for="projectManagerId">Project Manager ID:</label>
    <input type="text" id="projectManagerId" name="projectManagerId" value="<%= projectManagerId %>"><br/><br/>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" value="<%= name %>"><br/><br/>
    <label for="description">Description:</label>
    <textarea id="description" name="description"><%= description %></textarea><br/><br/>
    <label for="members">Members:</label>
    <input type="text" id="members" name="members" value="<%= members %>"><br/><br/>
    <button type="button" onclick="updateProject()">Update Project</button>
</form>

<script>
    function updateProject() {
        $.ajax({
            url: '/ProjectsManagement/updateProject',
            type: 'POST',
            data: $('#updateProjectForm').serialize(),
            success: function(response) {
                alert('Project updated successfully');
                window.location.href = 'displayProjectsPage.jsp';
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error: ' + textStatus + ' - ' + errorThrown);
            }
        });
    }
</script>

</body>
</html>
