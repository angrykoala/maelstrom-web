var data = [
    {
        name: "Black Pearl",
        model: "Galleon",
        life: 110,
        status: "docked",
        city: "Isengard"
    }, {
        name: "White Pearl",
        model: "Caravel",
        life: 110,
        status: "docked",
        city: "Minas Tirith"
    }, {
        name: "White Pearl",
        model: "Caravel",
        life: 110,
        status: "docked",
        city: "Minas Tirith"
    }
];

var ShipList = React.createClass({
    render: function() {
        var elements = this.props.elements.map(function(elem) {
            return (
                <div className="col-sm-6">
                    <ShipDisplay name={elem.name} model={elem.model} life={elem.life}/>
                </div>
            );
        });
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
    },
    render: function() {
        return (
            <div className="well">
                <h4>{this.props.name+" "}
                    <small>{this.props.model}</small>
                </h4>
                <p>Life: {this.props.life}</p>
            </div>
        );
    }
});

ReactDOM.render(
    <div>
    <h1>Test Ships</h1>
    <ShipList elements={data}/>
</div>, document.getElementById('shipcontent'));

/*

module.exports = MapComponent;
window.Map = MapComponent;*/
