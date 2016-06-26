var AutoCounter=require('./utils.jsx').AutoCounter;
var Cargo=require('./cargo.jsx');
var Map=require('./map.jsx');
var GameMap=require('../map');

var ShipLoad = {
    getInitialState: function() {
        return {
            ship: {
                model: "",
                status: "",
                cargo: {}
            },
            loaded: false,
            cityName: ""
        };
    },
    loadShip: function(shipId) {
        if (User.logged() && this.props.url && shipId) {
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
                    this.setShip(null, data);
                }.bind(this),
                error: function(xhr, status, err) {
                    this.setShip({error: err});
                }.bind(this)
            });
        }
    },
    setShip: function(err, data) {
        if (err)
            console.log(err);
        else {
        this.setState({ship: data, loaded: true});
        GameMap.promise.then(function(){
            this.setState({cityName: GameMap.names[data.city] || data.city});
        }.bind(this));
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
    getInitialState: function() {
        return {alertMsg:""};
    },
    moveTo: function(selec) {
        if (User.logged() && this.state.ship.slug) {
        var token = User.getToken();
        $.ajax({
            url: URLS.world+'/user/move/ship',
            type: "PUT",
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: {
                ship: this.state.ship.slug,
                city: selec
            },
            cache: false,
            success: function(data) {
                var s=this.state.ship;
                this.setState({alertMsg:<p className="text-success">Operation Successful</p>});
                this.reloadShip();
                //s.status.value="traveling";
                //this.setState({ship:s});
            }.bind(this),
            error: function(xhr, status) {
                var err=xhr.responseJSON.error;
                this.setState({alertMsg:<p className="text-danger">Error on move Ship: {err}</p>});
            }.bind(this)
        });
    }
    },
    reloadShip: function(){
        this.setState({loaded: false});
        this.loadShip(this.state.ship.slug);
    },
    onClose: function(){
        console.log("Modal close");
    },
    render: function() {
        var shipId = this.props.id || "null";
        var bodyContent;
        var remaining="";
        var statusValue=this.state.ship.status.value;
        var moveTo=(
            <div>
                <p>Move To</p>
                <Map.Selection url={URLS.world+"/map"} onSelection={this.moveTo}/>
            </div>);
        var alert=<p></p>;
        if(this.state.alertMsg){
            alert=this.state.alertMsg;
        }
        if(statusValue==="traveling"){
            moveTo="";
            if(this.state.ship.status.destiny) statusValue="traveling to "+this.state.ship.status.destiny;
            var t=parseInt(this.state.ship.status.remaining);
            remaining=<p>Remaining: <AutoCounter time={t} onTimeout={this.reloadShip}/></p>
        }
        if (this.state.loaded) {
            bodyContent = <div id="ship-data">
                <p>Type: {this.state.ship.model.name}</p>
                <p>Status: {statusValue}</p>
                {remaining}
                <p>City: {this.state.cityName}</p>
                <p>Speed: {this.state.ship.model.speed}</p>
                <p>Max. Cargo: {this.state.ship.model.cargo}</p>
                {moveTo}
                
                {alert}
                <hr></hr>
                <h4>Cargo</h4>
                <Cargo products={this.state.ship.cargo} id={shipId} status={this.state.ship.status.value} city={this.state.ship.city}/>
            </div>

        } else {
            bodyContent = <img src="images/ajax-loader.gif" alt="Loading" width="42" height="42" className="loading-img"/>
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

module.exports=Modal;
