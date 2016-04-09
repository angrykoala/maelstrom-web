var ShipsLoad = {
    getInitialState: function() {
        return {ships: [],id:"",name:""};
    },
    loadAllShips: function() {
        if (User.logged()) {
            var cb = this.setShips;
            var token = User.getToken();
            $.ajax({
                url: this.props.url+"/user/ships",
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
    setShips: function(err, data) {
        if (err) 
            console.log(err);
        else {
            this.setState({ships: data});
        }
    },
    componentDidMount: function() {
        this.loadAllShips();
    }
};

var ShipList = React.createClass({
    mixins: [ShipsLoad],
    setModal: function(id,name){
        this.setState({id:id,name:name});
    }, 
    render: function() {
        var setModal=this.setModal;
        var elements = this.state.ships.map(function(elem) {
            return (
                <div className="col-sm-6">
                    <ShipDisplay name={elem.name} model={elem.model} life={elem.life} id={elem.slug} onClick={setModal}/>
                </div>
            );
        });
        var url=this.props.url+"/user/ship";
        if (!elements || elements.length === 0) 
            elements = "No Ships";
        return (
            <div>
            <div className="row">
                {elements}
            </div>
            <ShipModal url={url} shipId={this.state.id}/>
            </div>
        );
    }
});

var ShipDisplay = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        model: React.PropTypes.string.isRequired,
        life: React.PropTypes.number.isRequired,
        onClick: React.PropTypes.func.isRequired
        //id required
    },
    handleClick: function() {
        this.props.onClick(this.props.id,this.props.name);
        //ModalShip.loadShip(this.props.id, this.props.name);
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
    <ShipList url="http://localhost:8080"/>
</div>, document.getElementById('shipcontent'));

window.Ships = {
    list: ShipList
};
