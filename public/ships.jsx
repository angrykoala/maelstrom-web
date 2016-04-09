var ShipsLoad = {
    getInitialState: function() {
        return {ships: []};
    },
    loadShips: function() {
        if(User.logged()){
        var cb = this.setShips;
        var token = User.getToken();
        $.ajax({
            url: this.props.url,
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
                cb({error:err});
            }
        });
    }
    },
    setShips: function(err, data) {
        if (err) 
            console.log(err);
        else {
            this.setState({ships: data});
        }
    },
    componentDidMount: function() {
        this.loadShips();
    }
};

var ShipList = React.createClass({
    mixins: [ShipsLoad],
    render: function() {
        var elements = this.state.ships.map(function(elem) {
            return (
                <div className="col-sm-6">
                    <ShipDisplay name={elem.name} model={elem.model} life={elem.life} id={elem.slug}/>
                </div>
            );
        });
        if (!elements || elements.length === 0) 
            elements = "No Ships";
        return (
            <div className="row">
                {elements}
            </div>
        );
    }
});

var ShipDisplay = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        model: React.PropTypes.string.isRequired,
        life: React.PropTypes.number.isRequired 
        //id required
    },
    handleClick: function(){
        ModalShip.loadShip(this.props.id,this.props.name);
    },
    render: function() {
        return (
            <button type="button" className="well btn-default" data-toggle="modal" data-target="#ship-modal" onClick={this.handleClick}>
                <h4>{this.props.name + " "}
                    <small>{this.props.model}</small>
                </h4>
                <p>Life: {this.props.life}</p>
            </button>
        );
    }
});

ReactDOM.render(
    <div>
    <ShipList url="http://localhost:8080/user/ships"/>
</div>, document.getElementById('shipcontent'));

window.Ships ={
    list:ShipList
};
