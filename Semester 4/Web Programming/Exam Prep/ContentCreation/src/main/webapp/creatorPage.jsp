<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*, main.Content" %>
<html>
<head>
    <title>Creator Page</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
<button type="button" onclick="location.href='addContent.jsp'">Add content</button>

<br/>

<div id="contentTable"></div>

<script>
    $(document).ready(function() {
        $.ajax({
            url: "/deleteContent",
            type: "GET",
            success: function(data) {
                var contents = JSON.parse(data);
                var html = '<table><tr><th>Title</th><th>Description</th><th>URL</th><th>Action</th></tr>';
                for (var i = 0; i < contents.length; i++) {
                    html += '<tr><td>' + contents[i].title + '</td><td>' + contents[i].description + '</td><td>' + contents[i].url + '</td>';
                    html += '<td><button class="delete-button" data-content-id="' + contents[i].contentId + '">Delete</button></td></tr>';
                }
                html += '</table>';
                $('#contentTable').html(html);
            }
        });

        $(document).on('click', '.delete-button', function() {
            const contentId = $(this).data('contentId');
            $.ajax({
                url: "/deleteContent",
                type: "POST",
                data: { contentId: contentId },
                success: function(data) {
                    // Refresh the table
                    location.reload();
                }
            });
        });
    });
</script>

</body>
</html>