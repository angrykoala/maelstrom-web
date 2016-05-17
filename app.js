/*
Name: Maelström-Web
Project: Maelström
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Maelström web client
*/

var express = require('express');
var app = express();

var urls = require('./config/urls');
var serverConfig = require('./config/server');

var version = process.env.npm_package_version;

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index', {
		urls: urls,
		tabs: true,
		version:version
	});
});
app.get('/signup', function(req, res) {
	res.render('signup', {
		urls: urls,
		tabs: false,
		version:version
	});
});
app.get('/account', function(req, res) {
	res.render('account', {
		urls: urls,
		tabs: false,
		version:version
	});
});

app.use(express.static('./public'));


console.log("Maelström - Web");
if (version) console.log("Version " + version);
server = app.listen(serverConfig.port, function() {
	console.log("Server listening on port " + serverConfig.port);
});
