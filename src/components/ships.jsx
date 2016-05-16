var ShipModal=require('./ship-modal.jsx');

var ShipsLoad = {
    getInitialState: function() {
        return {ships: [],id:"",name:"",loaded:false};
    },
    loadAllShips: function() {
        if (User.logged()) {
            //var cb = this.setShips;
            var token = User.getToken();
            $.ajax({
                url: URLS.world+"/user/ships",
                type: "GET",
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                cache: false,
                success: function(data) {
                    this.setShips(null, data);
                }.bind(this),
                error: function(xhr, status, err) {
                    console.log("Error loading ships");
                    setTimeout(this.loadAllShips,3000);
                }.bind(this)
            });
        }
    },
    setShips: function(err, data) {
        if (err)
            console.log(err);
        else {
            this.setState({ships: data,loaded:true});
        }
    },
    componentDidMount: function() {
        this.loadAllShips();
        addSocketEvent('ship_built',this.loadAllShips);
    }
};

var ShipList = React.createClass({
    mixins: [ShipsLoad],
    setModal: function(id,name){
        this.setState({id:id,name:name});
    },
    render: function() {
        var setModal=this.setModal;
        var elements =  <img src="images/ajax-loader.gif" alt="Loading" width="42" height="42" className="loading-img"/>;
        var url=URLS.world+"/user/ship";
        if(this.state.loaded){
        elements= this.state.ships.map(function(elem) {
            return (
                <div className="col-sm-6">
                    <ShipDisplay name={elem.name} model={elem.model} life={elem.life} id={elem.slug} onClick={setModal}/>
                </div>
            );
        });
        if (!elements || elements.length === 0)
            elements = "No Ships";
        }
        return (
            <div>
            <div className="row">
                {elements}
            </div>
            <ShipModal url={url} id={this.state.id} name={this.state.name}/>
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
var ShipsComponent={
    list: ShipList
}
//module.exports=ShipsComponent;

ReactDOM.render(
<div>
    <ShipList/>
</div>,
document.getElementById('ship-list'));
