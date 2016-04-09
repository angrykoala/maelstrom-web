var ModalShip = {
    loadShip: function(shipId, shipName) {
        if (User.logged()) {
            var setModal = this.setModal;
            this.setName(shipName);
            var token = User.getToken();
            $.ajax({
                url: "http://localhost:8080/user/ship/" + shipId,
                type: "GET",
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                cache: false,
                success: function(data) {
                    setModal(data);
                },
                error: function(xhr, status, err) {
                    console.log(err);
                }
            });
        }
    },
    setModal: function(data) {
        $('#ship-data .ship-type').text(data.model.name);
        $('#ship-data .ship-life').text(data.life);
        $('#ship-data .ship-status').text(data.status.value);
        $('#ship-data .ship-city').text(data.city);
        $('#ship-modal .loading-img').hide();
        $('#ship-data').show();
    },
    setName: function(name) {
        $('#ship-modal .ship-name').text(name);
    },
    setLoading: function() {
        this.setName("");
        $('#ship-data .ship-type').text("");
        $('#ship-data .ship-life').text("");
        $('#ship-data .ship-status').text("");
        $('#ship-data .ship-city').text("");
        $('#ship-modal .loading-img').show();
        $('#ship-data').hide();
    }
};
$(document).ready(function() {
    $('#ship-modal').on('hidden.bs.modal', function() {
        ModalShip.setLoading();
    });
});
