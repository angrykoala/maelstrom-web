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
      dataType: 'json',
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
  },
	render: function(){
		return (
		<div>
      		<p>
        		 {this.state.data}
		    </p>
      </div>
    );
    }
});

ReactDOM.render(
    <div>
        <Title />
        <Map url="http://localhost:8080/map"/>
    </div>,
  document.getElementById('content')
);
