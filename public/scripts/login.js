$(document).ready(function() {
	$('#login-form').submit(function(e) {
		e.preventDefault(); //STOP default action
		var postData = $(this).serializeArray();
		var formURL = $(this).attr("action");
		User.login(postData, function(err) {
			if (!err) {
				$('#login-err').text("");
				window.location.href = '/';
				$('#login-button').popover('hide');
			} else {
				$('#login-err').text(err);
			}
		});
	});
});