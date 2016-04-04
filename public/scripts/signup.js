//TODO: check email and password
$(document).ready(function() {
    $('#signup-form').submit(function(e) {
        var postData = $(this).serializeArray();
        var formURL = $(this).attr("action");
        $.ajax({
            url: formURL,
            type: "POST",
            data: postData,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                console.log(data);
                getDash(data.token);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(JSON.stringify(jqXHR));
                console.log(errorThrown);
            }
        });
        e.preventDefault(); //STOP default action
    });
});


function getDash(token) {
    $.ajax({
        url: "http://localhost:8081/restricted/dash",
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(data, status) {
            return console.log("The returned data", data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(JSON.stringify(jqXHR));
            console.log(errorThrown);
        }
    });

}
