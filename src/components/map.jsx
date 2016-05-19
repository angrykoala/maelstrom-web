var Utils = require('./utils.jsx');
var Api = require('../api.js');
var Map=require('../map.js');
var Dropdown = Utils.Dropdown;
var Selection = Utils.Selection;

var MapLoad = {
    getInitialState: function() {
        return {map: []};
    },
    componentDidMount: function() {
        Map.promise.then(function(data){
            this.setState({map:Map.list});
        }.bind(this));
    }
};

var MapComponent = {
    /*Dropdown: React.createClass({
        mixins: [MapLoad],
        render: function() {
            return (<Dropdown elements={this.state.map} title="Map" onSelection={this.props.onSelection}/>);
        }
    }),*/
    Selection: React.createClass({
        mixins: [MapLoad],
        render: function() {
            return (<Selection elements={this.state.map} title="Map" onSelection={this.props.onSelection}/>);
        }
    })
}

module.exports = MapComponent;
