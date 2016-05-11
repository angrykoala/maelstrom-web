var Cargo = React.createClass({
    propTypes: {
        products: React.PropTypes.object.isRequired,
        id: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        city: React.PropTypes.string.isRequired
    },
    getInitialState: function(){
        return {
            products:[],
            cityProducts:{},
            docked: (this.props.status == "docked")
        }
    },
    getCityDetails: function(){
        $.ajax({
            url: URLS.world+"/city/products/"+this.props.city,
            type: "GET",
            dataType: 'json',
/*            headers: {
                'Authorization': 'Bearer ' + token
            },*/
            cache: false,
            success: function(data) {
                console.log(JSON.stringify(data));
                if(!Products.loaded) console.log("WARNING: Products not loaded");
                else this.state.products=Products.list;
                this.setState({
                    products: Products.list,
                    cityProducts: data
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log("ERROR " + err);
                console.log("  " + JSON.stringify(xhr));
            }.bind(this)
        });


    },
    componentDidMount: function() {
    if(this.state.docked) this.getCityDetails();
  },
    render: function() {
        console.log(this.state.products);
        console.log(this.state.cityProducts);

        var elements = [];
        if(!this.state.docked){
            for (var elem in this.props.products) {
                elements.push(<ProductDisplay name={elem} quantity={this.props.products[elem]} shipId={this.props.id} docked={this.state.docked}/>);
            }
        }
        else{
            var shipProd=this.props.products;
            var cityProd=this.state.cityProducts;
            var dock=this.state.docked;
            var shipId=this.props.id;
            this.state.products.map(function(elem) {
                var shipq=shipProd[elem] || 0;
                console.log(elem);
                var cityq=cityProd[elem].quantity || 0;
                elements.push(<ProductDisplay name={elem} quantity={shipq} shipId={shipId} docked={dock} cityQuantity={cityq}/>);
            });
        }
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="text-center">Product</th>
                        <th className="text-center">Ship</th>
                        <th className="text-center">Actions</th>
                        <th className="text-center">City</th>
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
        shipId: React.PropTypes.string.isRequired,
        docked: React.PropTypes.bool.isRequired
    },
    getInitialState: function() {
        return {value: null, quantity: this.props.quantity};
    },
    handleChange: function(event) {
        var val = event.target.value;
        if (val < 0)
            val = 0;

        this.setState({value: val});
    },
    buy: function() {
        var val = parseInt(this.state.value) || 0;
        //console.log("Buy "+val+" of "+this.props.name+" in "+this.props.shipId);
        if (User.logged() && val > 0) {
            var token = User.getToken();
            $.ajax({
                url: URLS.world+"/user/buy",
                type: "PUT",
                dataType: 'json',
                data: {
                    ship: this.props.shipId,
                    product: this.props.name,
                    quantity: val
                },
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                cache: false,
                success: function(data) {
                    console.log("SUCCESS " + JSON.stringify(data));
                    var q = this.state.quantity;
                    this.setState({
                        quantity: q + val
                    });
                }.bind(this),
                error: function(xhr, status, err) {
                    console.log("ERROR " + err);
                    console.log("  " + JSON.stringify(xhr));
                }.bind(this)
            });
        }
    },
    sell: function() {
        var val = parseInt(this.state.value) || 0;
        //console.log("Sell "+val+" of "+this.props.name+" in "+this.props.shipId);
        if (User.logged() && val > 0) {
            var token = User.getToken();

            $.ajax({
                url: URLS.world+"/user/sell",
                type: "PUT",
                dataType: 'json',
                data: {
                    ship: this.props.shipId,
                    product: this.props.name,
                    quantity: val
                },
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                cache: false,
                success: function(data) {
                    console.log("SUCCESS " + JSON.stringify(data));
                    var q = this.state.quantity;
                    this.setState({
                        quantity: q - val
                    });
                }.bind(this),
                error: function(xhr, status, err) {
                    console.log("ERROR " + err);
                    console.log("  " + JSON.stringify(xhr));
                }.bind(this)
            });
        }
    },
    render: function() {
        var actionButtons;
        var cityProduct;
        if (this.props.docked) {
            actionButtons = <div className="btn-group">
                <button type="button" className="btn btn-default" onClick={this.buy}>Buy</button>
                <button type="button" className="btn btn-default" onClick={this.sell}>Sell</button>
            </div>

            cityProduct=this.props.cityQuantity || 0;
        } else {
            actionButtons = <div className="btn-group">
                <button type="button" className="btn btn-default" onClick={this.buy} disabled>Buy</button>
                <button type="button" className="btn btn-default" onClick={this.sell} disabled>Sell</button>
            </div>

            cityProduct="";
        }
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.state.quantity}</td>
                <td>
                    <form role="form">
                        <input type="number" min="0" value={this.state.value} onChange={this.handleChange} className="form-control input-sm"></input>
                    </form>
                    {actionButtons}
                </td>
                <td>{cityProduct}</td>
            </tr>
        );
    }
});

window.Cargo = {
    Display: Cargo,
    Product: ProductDisplay
};
