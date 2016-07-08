var Map = require('./map');
var Api = require('./api');

$(document).ready(function() {
    $('.map-city').mousedown(function() {
        var id = $(this).attr("title");

        $('#mapModal .modal-title').text(Map.names[id]);
        $('#mapModal .ships-list').html('<img src="images/ajax-loader.gif" alt="Loading" width="42" height="42" className="loading-img"/>');
        $('#mapModal').modal('show');
        Api.get(URLS.world + '/city/ships/' + id, function(err, res) {
            if (err) $('#mapModal .ships-list').text('Error fetching ships ' + err);
            else {
                if (res.length === 0) $('#mapModal .ships-list').text("No ships in city");
                else {
                    var list = '<ul class="list-group">';
                    for (var i = 0; i < res.length; i++) {
                        list += '<li class="list-group-item">' + res[i].ship + ' - ' + res[i].type + '</li>';
                    }
                    list += '</ul>';
                    $('#mapModal .ships-list').html(list);

                }
            }
        });
    });
});
