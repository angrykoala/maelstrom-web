$(document).ready(function() {
    $('#login-button').popover({
        html: true,
        container: 'body'
    });
    Nav.setUserButtons();
    Nav.setTabs();
});

Nav={
    setUserButtons: function() {
        if (User.logged()) {
            $('#account-button').removeClass('hidden');
            $('#login-button').addClass('hidden');
            $('#signup-button').addClass('hidden');
        } else {
            $('#account-button').addClass('hidden');
            $('#login-button').removeClass('hidden');
            $('#signup-button').removeClass('hidden');
        }

    },
    setTabs: function(){
        if (User.logged()) {
            $('#home-tab').removeClass('hidden');
            $('#map-tab').removeClass('hidden');
            $('#ships-tab').removeClass('hidden');
        } else {
            $('#home-tab').addClass('hidden');
            $('#map-tab').addClass('hidden');
            $('#ships-tab').addClass('hidden');
            
        }
        
    }
};
