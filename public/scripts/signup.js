//TODO: check email and password
$(document).ready(function() {
	$('#signup-form').submit(function(e) {
		e.preventDefault(); //STOP default action
		var postData = $(this).serializeArray();
		var formURL = $(this).attr("action");
		User.signup(postData, function(res) {
			console.log(res);
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