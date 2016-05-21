//TODO: check email and password
$(document).ready(function() {
	$('#signup-form').submit(function(e) {
		e.preventDefault(); //STOP default action
		$('#signup-err').text('');
		var postData = $(this).serializeArray();
		var formURL = $(this).attr("action");
		User.signup(postData, function(err) {
			if(err) $('#signup-err').text(err);
			else window.location.href = '/';
		});
	});
});

function getDash(token) {
	$.ajax({
		url: URLS.user + "/restricted/dash",
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
