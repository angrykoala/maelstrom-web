var Title = React.createClass({
  render: function() {
    return (
      <div className="container">
        <h1>Maelström</h1>
      </div>
    );
  }
});
ReactDOM.render(
  <Title />,
  document.getElementById('content')
);
