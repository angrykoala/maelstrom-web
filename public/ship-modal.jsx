var ShipLoad = {
    getInitialState: function() {
        return {
            ship: {
                model: "",
                status: "",
                loaded: false,
                cargo: {}
            }
        };
    },
    loadShip: function(shipId) {
        if (User.logged() && this.props.url && shipId) {
            var cb = this.setShip;
            var token = User.getToken();
            $.ajax({
                url: this.props.url + "/" + shipId,
                type: "GET",
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                cache: false,
                success: function(data) {
                    cb(null, data);
                },
                error: function(xhr, status, err) {
                    cb({error: err});
                }
            });
        }
    },
    setShip: function(err, data) {
        if (err) 
            console.log(err);
        else {
            this.setState({ship: data, loaded: true});
        }
    },
    componentWillReceiveProps: function(props) {
        this.setState({loaded: false});
        if (props.id) 
            this.loadShip(props.id);
        }
    };

var Modal = React.createClass({
    mixins: [ShipLoad],
    /*click: function() {
        this.loadShip();
    },*/
    moveTo: function(selec) {
        console.log("Move " + this.props.id + " from " + this.state.ship.city + " to " + selec);
    },
    render: function() {
        var shipId = this.props.id || "null";
        var bodyContent;
        if (this.state.loaded) {
            bodyContent = <div id="ship-data">
                <p>Type: {this.state.ship.model.name}</p>
                <p>Life: {this.state.ship.life}</p>
                <p>Status: {this.state.ship.status.value}</p>
                <p>City: {this.state.ship.city}</p>
                <p>Move To</p>
                <Map.Selection url="http://localhost:8080/map" onSelection={this.moveTo}/>
                <hr></hr>
                <h4>Cargo</h4>
                <Cargo.Display products={this.state.ship.cargo} id={shipId} status={this.state.ship.status.value} city={this.state.ship.city}/>
            </div>

        } else {
            bodyContent = <img src="ajax-loader.gif" alt="Loading" width="42" height="42" className="loading-img"/>
        }

        return (
            <div className="modal fade" id="ship-modal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">
                                <strong>{this.props.name}</strong>
                            </h4>
                        </div>
                        <div className="modal-body">
                            {bodyContent}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

window.ShipModal = Modal;
