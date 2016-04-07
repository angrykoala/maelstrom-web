$(document).ready(function() {
    $('#login-form').submit(function(e) {
        e.preventDefault(); //STOP default action
        var postData = $(this).serializeArray();
        var formURL = $(this).attr("action");
        User.login(postData,function(err){
            if(!err){
                window.location.href='/';
                $('#login-button').popover('hide');
             }
            else {
                console.log(err);   
            }         
        });
    });
});
