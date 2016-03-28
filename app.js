/*
Name: Maelström-Web
Project: Maelström
Version: 0.1.0
Author: demiurgosoft <demiurgosoft@hotmail.com>
Description: Maelström web client
*/

var express = require('express');
var app = express();

app.get('/', function(req,res){
	res.redirect('/index.html');
});

app.use(express.static('./public'));

// Creación del servidor
server = app.listen(9090,"localhost", function() {
	console.log('Express server listening on 9090');
});