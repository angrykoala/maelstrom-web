var Title = React.createClass({
  render: function() {
    return (
      <div className="container">
        <h1>Maelström</h1>
      </div>
    );
  }
});
var Map=React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  loadMap: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'jsonp',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
   componentDidMount: function() {
    this.loadMap();
    setInterval(this.loadMap, this.props.pollInterval);
  },
	render: function(){
		return (
		<div>
      		<p>
        		 {this.state.data.toString}
		    </p>
      </div>
    );
    }
});

ReactDOM.render(
  <Map url="http://localhost:8080/map" pollInterval={2000}/>,
  document.getElementById('content')
);
