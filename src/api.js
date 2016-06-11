var socketHandler = require('./socket-handler');
var User = require('./user');

var Api = {
	timeout: 3000,
	get: function(dir, done) {
		$.ajax({
			url: dir,
			type: "GET",
			dataType: 'json',
			cache: false,
			success: function(data) {
				done(null, data);
			},
			error: function(xhr, status, err) {
				done(err);
			}
		});
	},
	post: function(dir, data, done) {
		$.ajax({
			url: dir,
			type: "POST",
			dataType: 'json',
			data: data,
			cache: false,
			success: function(data) {
				done(null, data);
			},
			error: function(xhr, status, err) {
				done(err);
			}
		});
	},
	getPoll: function(dir, done, timeout, onError) {
		var time = timeout || this.timeout;
		$.ajax({
			url: dir,
			type: "GET",
			dataType: 'json',
			cache: false,
			success: function(data) {
				done(null, data);
			},
			error: function(xhr, status) {
				setTimeout(function() {
					this.getPoll(dir, done, timeout);
				}.bind(this), time);
				if (onError) onError(xhr.responseJSON);
			}.bind(this)
		});
	},
	getPollAuth: function(dir, done, onError) {
		var token = User.getToken();
		var time = this.timeout;
		$.ajax({
			url: dir,
			type: "GET",
			dataType: 'json',
			headers: {
				'Authorization': 'Bearer ' + token
			},
			cache: false,
			success: function(data) {
				done(null, data);
			},
			error: function(xhr, status) {
				setTimeout(function() {
					this.getPollAuth(dir, done, time);
				}.bind(this), time);
				if (onError) onError(xhr.responseJSON);
			}.bind(this)
		});
	},
	socketOn: socketHandler.socketOn,
	socketEmit: socketHandler.emit,
	socketHandler: socketHandler
};
module.exports = Api;