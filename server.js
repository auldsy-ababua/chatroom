//First you require a Socket.IO module.
var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

//you wrap the Express app in a Node http.Server object.
//This allows Socket.IO to run alongside Express.
var app = express();
app.use(express.static('public'));


//You then initialize an io object, by passing the server
//into the socket_io function. This creates a Socket.IO Server,
//which is an EventEmitter
var server = http.Server(app);
var io = socket_io(server);


//Next you add a listener to the connection event of the server.
//This will be called whenever a new client connects to the Socket.IO server.
io.on('connection', function (socket) {
    console.log('Client connected');
});

// Finally notice that you now call server.listen rather than app.listen
server.listen(8080, () => console.log('server started'));
