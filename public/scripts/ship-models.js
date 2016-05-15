//Ship Models Handler

var ShipModels = {
	list: [],
	loaded: false,
	refreshModels: function() {
		$.ajax({
			url: URLS.world + '/ship_models',
			type: "GET",
			dataType: 'json',
			cache: false,
			success: function(data) {
				console.log("SUCCESS");
				this.list = data;
				this.loaded = true;
			}.bind(this),
			error: function(xhr, status) {
				console.log("ERROR");
				setTimeout(this.refreshModels, 3000); //Only called twice, WHY?
			}.bind(this)
		});
	},
};

ShipModels.refreshModels();