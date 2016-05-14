this.socket = io.connect(URLS.world, {
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
socket.on('ship_arrive', function(msg) {
	console.log("Ship Update " + msg);
});

function addSocketEvent(eventName, cb) {
	socket.on(eventName, cb);
}