var Cargo=React.createClass({
    propTypes:{
        products: React.PropTypes.object.isRequired,
        //id required
    },
    render: function(){
        var elements = [];
        for(var elem in this.props.products){
            elements.push(
                <ProductDisplay name={elem} quantity={this.props.products[elem]} shipId={this.props.id} />
            )
            
        }
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="text-center">Product</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {elements}
                </tbody>
            </table>
        );        
    }
});


var ProductDisplay = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        quantity: React.PropTypes.number.isRequired,
        shipId: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {value: null,quantity:this.props.quantity};
    },
    handleChange: function(event){
        var val=event.target.value;
        if(val<0) val=0;
        
        this.setState({value: val});
    },
    buy: function(){
        var val=parseInt(this.state.value) || 0;
        //console.log("Buy "+val+" of "+this.props.name+" in "+this.props.shipId);
        if (User.logged() && val>0) {
            var token = User.getToken();
            $.ajax({
                url: "http://localhost:8080/user/buy",
                type: "PUT",
                dataType: 'json',
                data:{
                    ship:this.props.shipId,
                    product: this.props.name,
                    quantity: val
                },
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                cache: false,
                success: function(data) {
                    console.log("SUCCESS "+JSON.stringify(data));
                    var q=this.state.quantity;
                    this.setState({quantity:q+val});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.log("ERROR "+err);
                    console.log("  "+JSON.stringify(xhr));
                }.bind(this)
            });
        }    
    },
    sell: function(){
        var val=parseInt(this.state.value) || 0;
        //console.log("Sell "+val+" of "+this.props.name+" in "+this.props.shipId);
        if (User.logged() && val>0) {
            var token = User.getToken();

            $.ajax({
                url: "http://localhost:8080/user/sell",
                type: "PUT",
                dataType: 'json',
                data:{
                    ship:this.props.shipId,
                    product: this.props.name,
                    quantity: val
                },
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                cache: false,
                success: function(data) {
                    console.log("SUCCESS "+JSON.stringify(data));
                    var q=this.state.quantity;
                    this.setState({quantity:q-val});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.log("ERROR "+err);
                    console.log("  "+JSON.stringify(xhr));
                }.bind(this)
            });
        }
    },
    render: function() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.state.quantity}</td>
                <td>
                    <form role="form">
                        <input type="number" min="0" value={this.state.value} onChange={this.handleChange} className="form-control input-sm"></input>
                    </form>                   
                    <div className="btn-group">
                        <button type="button" className="btn btn-default" onClick={this.buy}>Buy</button>
                        <button type="button" className="btn btn-default" onClick={this.sell}>Sell</button>
                    </div>
                </td>
            </tr>
        );
    }
});

window.Cargo = {
    Display: Cargo,
    Product: ProductDisplay
};
