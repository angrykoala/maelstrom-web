var Utils=require('./utils.jsx');
var Dropdown=Utils.Dropdown;
var Selection=Utils.Selection;


var MapLoad = {
    getInitialState: function() {
        return {map: []};
    },
    loadMap: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({map: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadMap();
    }
};

module.exports = {
    Dropdown: React.createClass({
        mixins: [MapLoad],
        onSelection: function(selec) {
            console.log(selec);
        },
        render: function() {
            return (<Dropdown elements={this.state.map} title="Map" onSelection={this.onSelection}/>);
        }
    }),
    Selection: React.createClass({
        mixins: [MapLoad],
        onSelection: function(selec) {
            console.log(selec);
        },
        render: function() {
            return (<Selection elements={this.state.map} title="Map" onSelection={this.onSelection}/>);
        }
    })
}
