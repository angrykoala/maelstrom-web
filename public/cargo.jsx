//TODO: cargo List


var ProductDisplay = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        quantity: React.PropTypes.string.isRequired,
    },
    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <ul className="list-group">
                        <li className="list-group-item">{this.props.name} - {this.props.quantity}</li>
                    </ul>
                </div>
            </div>
        );
    }
});

window.Cargo = {
    display: ProductDisplay
};
