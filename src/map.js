// Map handler
var API = require('./api');

function getIndex(l){
	var ind={};
	for(var i=0;i<l.length;i++){
		ind[l[i].slug]=l[i].name;
	}
	return ind;

}

function GameMap() {
	this.list = [];
	this.names={};
	this.promise = new Promise(function(resolve, reject) {
		API.getPoll(URLS.world + '/map', function(err, data) {
			if (err) {
				console.log("GAME MAP ERROR");
			} else {
				this.list = data;
				this.names=getIndex(this.list);
				resolve();
			}
		}.bind(this));
	}.bind(this));
}

var Map = new GameMap();
module.exports = Map;
