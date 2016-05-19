// Map handler
var API = require('./api');

function GameMap() {
	this.list = [];
	this.promise = new Promise(function(resolve, reject) {
		API.getPoll(URLS.world + '/map', function(err, data) {
			if (err) {
				console.log("GAME MAP ERROR");
			} else {
				this.list = data;
				resolve();
			}
		}.bind(this));
	}.bind(this));
}

var Map = new GameMap();
module.exports = Map;
