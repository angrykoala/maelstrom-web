var Cargo=React.createClass({
    propTypes:{
        products: React.PropTypes.object.isRequired    
    },
    render: function(){

        var elements = [];
        for(var elem in this.props.products){
            elements.push(
                <ProductDisplay name={elem} quantity={this.props.products[elem]} />
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
    },
    render: function() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.quantity}</td>
                <td>My Actions</td>
            </tr>
        );
    }
});

window.Cargo = {
    Display: Cargo,
    Product: ProductDisplay
};
