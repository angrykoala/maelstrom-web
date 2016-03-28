var MapLoad={
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
   },
};

var MapDropdown=React.createClass({
    mixins: [MapLoad],
    onSelection: function(selec){
        console.log(selec);
    },
    render: function(){
		return (
         <Dropdown elements={this.state.map} title="Map" onSelection={this.onSelection}/> 
    );
    }
});


//Needs to pass title, elements and callback
var Dropdown=React.createClass({
     propTypes: {
        elements: React.PropTypes.array.isRequired,
        title: React.PropTypes.string.isRequired,
        onSelection: React.PropTypes.func.isRequired
    },
    render: function(){
    var cb=this.props.onSelection;
    var elements = this.props.elements.map(function(elem) {
      return (
          <li><a href="#" onClick={cb.bind(this,elem)}>{elem}</a></li>
      );
    });
    return(
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">{this.props.title}
                <span className="caret"></span></button>
            <ul className="dropdown-menu">
                {elements}
            </ul>
        </div> 
    );   
    }
});

ReactDOM.render(
  <MapDropdown url="http://localhost:8080/map"/>,
  document.getElementById('content')
);
