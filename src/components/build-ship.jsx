var Utils=require('./utils.jsx');
var Map=require('./map.jsx');
var ShipModels=require('./../ship-models');
var User=require('./../user');

var BuildButton = React.createClass({
    getInitialState: function() {
        return {clicked: false};
    },
    render: function() {
        var modal = "";
        if (this.state.clicked)
            modal = <buildModal/>
            if(!User.logged()) return (<div></div>);
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#build-modal">Build Ship</button>
                <BuildModal/>
            </div>
        );
    }
});
var BuildModal = React.createClass({
    getInitialState: function() {
        return {shipName: '', city: '', shipModel: '', models:[], errorMessage:""};
    },
    nameChange: function(event) {
        this.setState({shipName: event.target.value});
    },
    cityChange: function(city) {
        this.setState({city: city});
    },
    shipChange: function(ship) {
        this.setState({shipModel: ship});
    },
    buildShip: function(e) {
        e.preventDefault();
        if (User.logged()) {
            var token = User.getToken();
            $.ajax({
                url: URLS.world + '/user/build/ship',
                type: "PUT",
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: {
                    model: this.state.shipModel,
                    ship_name: this.state.shipName,
                    city: this.state.city
                },
                cache: false,
                success: function(data) {
                    this.setState({errorMessage:<p className="text-success">Ship succesfully built</p>});
                }.bind(this),
                error: function(xhr, status) {
                    var err=xhr.responseJSON.error || "";
                    this.setState({errorMessage:<p className="text-danger">Error Building Ship {err}</p>});
                }.bind(this)
            });
        }
    },
    componentDidMount: function() {
        ShipModels.promise.then(function(){
            this.setState({models: ShipModels.list});
    }.bind(this));
    },
    render: function() {
        return (
            <div id="build-modal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Build Ship</h4>
                        </div>
                        <div className="modal-body">
                            <form id="build-form" role="form" action="" onSubmit={this.buildShip}>
                                <div className="form-group">
                                    <input type="text" placeholder="Ship Name" className="form-control" onChange={this.nameChange}/>
                                </div>
                                <div className="form-group">
                                    <label>City:</label>
                                    <Map.Selection url={URLS.world + "/map"} onSelection={this.cityChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Ship Models:</label>
                                    <Utils.Selection elements={this.state.models} title="Ship Model" onSelection={this.shipChange}/>
                                </div>
                                {this.state.errorMessage}
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Build</button>
                                </div>
                            </form>
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

ReactDOM.render(
<div>
    <BuildButton/>
</div>,
document.getElementById('build-button'));
