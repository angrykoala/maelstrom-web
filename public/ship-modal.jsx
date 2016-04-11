
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
                    console.log(data);
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
            this.setState({ship: data,loaded:true});
        }
    },
    componentWillReceiveProps: function(props) {
        this.setState({loaded:false});
        if (props.id) 
            this.loadShip(props.id);
        }
    };

var Modal = React.createClass({
    mixins: [ShipLoad],
    /*click: function() {
        this.loadShip();
    },*/
    render: function() {
        return (
            <div className="modal fade" id="ship-modal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title"><strong>{this.props.name}</strong></h4>
                        </div>
                        <div className="modal-body">
                            <img src="ajax-loader.gif" alt="Loading" width="42" height="42" className="loading-img" hidden={this.state.loaded}/>
                                <div id="ship-data" hidden={!this.state.loaded}>
                                        <p>Type: {this.state.ship.model.name}</p>
                                        <p>Life: {this.state.ship.life}</p>
                                        <p>Status: {this.state.ship.status.value}</p>
                                        <p>City: {this.state.ship.city}</p>
                                        <hr></hr>
                                        <h4>Cargo</h4>
                                        <Cargo.Display products={this.state.ship.cargo}/>
                                </div>
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
        
window.ShipModal=Modal;