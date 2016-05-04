//Ship Models Hanndler

ShipModels = {
	list: [],
	loaded: false,
	refreshProducts: function(done) {
		$.ajax({
			url: URLS.world + '/ship_models',
			type: "GET",
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.list = data;
				this.loaded = true;
				done(null);
			}.bind(this),
			error: function(xhr, status) {
				done(xhr);
			}
		});
	},
};

function onRefresh(err) {
	if (err) setTimeout(function() {
		ShipModels.refreshProducts(onRefresh);
	}, 3000);
}
ShipModels.refreshProducts(onRefresh);
