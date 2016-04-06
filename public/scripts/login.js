$(document).ready(function() {
    $('#login-form').submit(function(e) {
        e.preventDefault(); //STOP default action
        var postData = $(this).serializeArray();
        var formURL = $(this).attr("action");
        /*$.ajax({
            url: formURL,
            type: "POST",
            data: postData,
            dataType: 'json',
            async: true,
            success: function(data, textStatus, jqXHR) {
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(JSON.stringify(jqXHR));
                console.log(errorThrown);
            }
        });*/
        User.login(postData,function(res){
            console.log(res);            
        });
        
    });
});
