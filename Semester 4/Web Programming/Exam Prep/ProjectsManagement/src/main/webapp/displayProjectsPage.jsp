<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Display Projects Page</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
<h2>All Projects</h2>

<br/>

<div id="projectTable"></div>
<script>
    $(document).ready(function() {
        $.ajax({
            url: "/ProjectsManagement/displayProjects",
            dataType: "json",
            type: "GET",
            success: function(data) {
                var contents = data;
                var html = '<table><tr><th>Name</th><th>Description</th><th>Members</th><th>Actions</th></tr>';
                for (var i = 0; i < contents.length; i++) {
                    html += '<tr><td>' + contents[i].name + '</td><td>' + contents[i].description + '</td><td>' + contents[i].members + '</td>';
                    html += '<td><button onclick="location.href=\'updateProjectPage.jsp?projectId=' + contents[i].id + '\'">Update</button></td></tr>';
                }
                html += '</table>';
                $('#projectTable').html(html);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error: ' + textStatus + ' - ' + errorThrown);
            }
        });
    });
</script>

<br/>

<div id="projectTableDeveloper"></div>

<script>
    $(document).ready(function() {
        $.ajax({
            url: "/ProjectsManagement/displayProjectsDeveloper",
            dataType: "json",
            type: "GET",
            success: function(data) {
                var contents = data;
                var html = '<table><tr><th>Name</th></tr>';
                for (var i = 0; i < contents.length; i++) {
                    html += '<tr><td>' + contents[i].name + '</td>';
                }
                html += '</table>';
                $('#projectTableDeveloper').html(html);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error: ' + textStatus + ' - ' + errorThrown);
            }
        });
    });
</script>

<br/>

<button type="button" onclick="location.href='assignDeveloperPage.jsp'">Assign developer to project</button>

</body>
</html>