var static = require('node-static');
var http = require('http');
var file = new(static.Server)();

var port = process.env.PORT || 80;

var app = http.createServer(function (req, res) {
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