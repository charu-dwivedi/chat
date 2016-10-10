var static = require('node-static');
var https = require('https');
var express = require('express');
var fs = require('fs');
var file = new(static.Server)();

var port = process.env.PORT || 80;

var options = {
    key: fs.readFileSync('path/to/key.pem');
    cert: fs.readFileSync('path/to/certificate.cert');
};

var app = https.createServer(options, function (req, res) {
	file.serve(req, res);
});

var io = require('socket.io')(app);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

app.listen(port, function(){
	console.log('listening on '+ port);
});