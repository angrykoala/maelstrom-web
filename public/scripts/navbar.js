$(document).ready(function() {
    $('#login-button').popover({
        html: true,
        container: 'body'
    });
    Nav.setUserButtons();
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

    }
}
