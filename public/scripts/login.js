$(document).ready(function() {
    $('#login-form').submit(function(e) {
        var postData = $(this).serializeArray();
        var formURL = $(this).attr("action");
        $.ajax({
            url: formURL,
            type: "POST",
            data: postData,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(JSON.stringify(jqXHR));
                console.log(errorThrown);
            }
        });
        e.preventDefault(); //STOP default action
    });
});
