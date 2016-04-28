this.socket = io.connect('http://localhost:8080/', {
	'query': 'token=' + User.getToken()
});

//On socket conenction
socket.on('connect', function() {
	console.log("socket connected auth");
});
socket.on('error', function() {
	console.log("Error");
});
socket.on('money', function(msg) {
	$(".money_display").text(msg);
});
socket.on('ship_update', function(msg) {
	console.log(msg);
});