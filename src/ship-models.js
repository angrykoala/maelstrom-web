//Ship Models Handler
var API = require('./api');

function ShipModels() {
	this.list = [];
	this.promise = new Promise(function(resolve, reject) {
		API.getPoll(URLS.world + '/ship_models', function(err, data) {
			if (err) {
				console.log("Ship Models ERROR");
			} else {
				this.list = data;
				resolve();
			}
		}.bind(this));
	}.bind(this));
}

var Ships = new ShipModels();
module.exports = Ships;