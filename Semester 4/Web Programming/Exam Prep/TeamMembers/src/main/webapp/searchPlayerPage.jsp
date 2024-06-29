<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Search Player</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#search').keyup(function() {
                let query = $(this).val();
                if (query.length > 0) {
                    $.ajax({
                        url: 'searchPlayer',
                        method: 'GET',
                        data: { search: query },
                        success: function(data) {
                            let results = $(data).find('p').map(function() {
                                return $(this).text();
                            }).get();

                            results.sort();

                            let sortedResults = results.map(function(name) {
                                return '<p>' + name + '</p>';
                            }).join('');

                            $('#results').html(sortedResults);
                        }
                    });
                } else {
                    $('#results').html('');
                }
            });
        });
    </script>
</head>
<body>
<h2>Search Player</h2>
<input type="text" id="search" placeholder="Enter player name"/>
<div id="results"></div>

<button type="button" onclick="location.href='findFriendsPage.jsp'">Find friends</button>
</body>
</html>
