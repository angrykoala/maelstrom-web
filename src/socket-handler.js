var User = require('./user');

var socket = io.connect(URLS.world, {
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
	console.log("Ship arrive " + msg);
});

var socketAPI = {
	socketOn: function(eventName, cb) {
		socket.on(eventName, cb);
	},
	emit: function(eventName, msg) {
		socket.emit(eventName, msg);
	},
	onCityUpdate: function(data) {}
};

socket.on('city-update', function(data) {
	//console.log('city_update '+JSON.stringify(data));
	socketAPI.onCityUpdate(data);
});

module.exports = socketAPI;