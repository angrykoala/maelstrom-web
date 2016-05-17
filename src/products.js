//Products handler
var API = require('./api');

function GameProducts() {
	this.list = [];
	this.promise = new Promise(function(resolve, reject) {
		API.getPoll(URLS.world + '/products', function(err, data) {
			if (err) {
				console.log("GAME PRODUCTS ERROR");
			} else {
				this.list = data;
				resolve();
			}
		}.bind(this));
	}.bind(this));
}

var Products = new GameProducts();

module.exports = Products;