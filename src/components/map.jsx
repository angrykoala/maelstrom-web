var Utils = require('./utils.jsx');
var Api = require('./api.js');
var Dropdown = Utils.Dropdown;
var Selection = Utils.Selection;

var MapLoad = {
    getInitialState: function() {
        return {map: []};
    },
    loadMap: function() {
        Api.get(this.props.url, this.setMap);
    },
    setMap: function(err, data) {
        if (err)
            console.log(err);
        else
            this.setState({map: data});
        }
    ,
    componentDidMount: function() {
        this.loadMap();
    }
};

var MapComponent = {
    Dropdown: React.createClass({
        mixins: [MapLoad],
        render: function() {
            return (<Dropdown elements={this.state.map} title="Map" onSelection={this.props.onSelection}/>);
        }
    }),
    Selection: React.createClass({
        mixins: [MapLoad],
        render: function() {
            return (<Selection elements={this.state.map} title="Map" onSelection={this.props.onSelection}/>);
        }
    })
}

module.exports = MapComponent;
