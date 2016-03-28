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
          <li><a href="#" onClick={cb.bind(null,elem)}>{elem}</a></li>
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

var Selection=React.createClass({
    propTypes: {
       elements: React.PropTypes.array.isRequired,
       title: React.PropTypes.string.isRequired,
       onSelection: React.PropTypes.func.isRequired
   },
   onSelectionWrapper: function(e){
       this.props.onSelection(e.target.value);
   },
   render: function(){
   var cb=this.props.onSelection;
   var elements = this.props.elements.map(function(elem) {
     return (
          <option value={elem}>{elem}</option>
     );
   });
   return(
       <form role="form">
       <div className="form-group">
           <label htmlFor={this.props.title+"sel"}>{this.props.title}</label>
           <select className="form-control" id={this.props.title+"sel"} onChange={this.onSelectionWrapper}>
               {elements}
        </select>
    </div>
</form>
   );   
 }    
});



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

function onselec(selec){
    console.log(selec);
}
ReactDOM.render(
    <div>
  <MapDropdown url="http://localhost:8080/map"/>
  <Selection title="Test" elements={["elem1","elem2"]} onSelection={onselec} />
  </div>,
  document.getElementById('content')
);
