$(document).ready(function() {
    $('#login-form').submit(function(e) {
        e.preventDefault(); //STOP default action
        var postData = $(this).serializeArray();
        var formURL = $(this).attr("action");
        User.login(postData,function(err){
            if(!err) $('#login-button').popover('hide');
            console.log(err);            
        });
    });
});
