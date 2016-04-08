
//button -> modal -> modal content
var ShipLoad = {
    getInitialState: function() {
        return {ship: {model:"",status:""}};
    },
    loadShip: function() {
        if(User.logged()){
        var cb = this.setShip;
        var token = User.getToken();
        $.ajax({
            url: this.props.url+"/"+this.props.shipId,
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
    setShip: function(err, data) {
        if (err) 
            console.log(err);
        else {
            this.setState({ship: data});
        }
    },
    componentDidMount: function() {
        this.loadShip();
    }
};

var Modal = React.createClass({
    mixins: [ShipLoad],
    render: function() {
        console.log(JSON.stringify(this.state.ship));
        return (
            <div>
            <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
            <div className="modal fade" id="myModal" role="dialog">
              <div className="modal-dialog">
              
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">{this.state.ship.name}</h4>
                  </div>
                  <div className="modal-body">
                      <p>Type: {this.state.ship.model.name}</p>
                      <p>Life: {this.state.ship.life}</p>
                      <p>Status: {this.state.ship.status.value}</p>
                      <p>City: {this.state.ship.city}</p>
                    <hr></hr>
                    <h4>Cargo</h4>
                        <p>Cargo stuff here</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
            </div>
        </div>
    </div>            
        );
    }
});


ReactDOM.render(
    <Modal url="http://localhost:8080/user/ship" shipId="black-pearl"/>, document.getElementById('modaltest'));
