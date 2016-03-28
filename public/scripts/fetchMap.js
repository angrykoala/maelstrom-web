$(document).ready(function() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://localhost:8080/map"
    }).then(function(data) {
       console.log(data);
       $('#map').text(JSON.stringify(data));
    });
});
