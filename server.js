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
//{ &*6876876876876: 'Mario', 9798lhlkjljlj: 'Colin'  }
var allUsernames = {};

//Next you add a listener to the connection event of the server.
//This will be called whenever a new client connects to the Socket.IO server.
io.on('connection', function (socket) {


    //Here you add a new listener to the socket which is used to communicate
    //with the client. When a message with the name message is received on
    //the socket you simply print out the message.
    socket.on('message', function(message) {
        console.log('Received message:', message);
        var username = allUsernames[socket.id];
        //Finally you need to broadcast the message to any other clients who are connected.
        socket.broadcast.emit('message', username + ": " + message);
    });

    //when a new client provides a username, it is added to the users object.
    socket.on('login', function(username) {
        allUsernames[socket.id] = username;
        socket.broadcast.emit('message', username);
        socket.broadcast.emit('totalUsers', Object.keys(allUsernames).length);
        socket.emit('totalUsers', Object.keys(allUsernames).length);
    });
    socket.on('disconnect',function(){
        socket.broadcast.emit('message', 'Client Disonnected' + socket.id);
        delete allUsernames[socket.id];
        socket.broadcast.emit('totalUsers', Object.keys(allUsernames).length);
    })
});


// Finally notice that you now call server.listen rather than app.listen
server.listen(8080, () => console.log('server started'));
