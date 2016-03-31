// main.js
var React = require('react');
var ReactDOM = require('react-dom');
//Components
var Map=require('./components/map.jsx');

//var Button = require('react-bootstrap/lib/Button');

ReactDOM.render(
    <div>
    <h1>Test</h1>
    <Map.Dropdown url="http://localhost:8080/map"/>
    <Map.Selection url="http://localhost:8080/map"/>
</div>, document.getElementById('content'));
