$(document).ready(function() {
    //Here you create a Manager object by calling the io function.
    //This object will automatically attempt to connect to the server,
    //and will allow you to send and receive messages.
    var socket = io();
    var input = $('input');
    var messages = $('#messages');

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        addMessage(message);
        //Here we call the socket.emit function. This sends a message
        //to the Socket.IO server. The first argument is a name for
        //our message - in this case we simply call it message.
        //The second argument is some data to attach to our message.
        //In this case it's the contents of the text box.
        socket.emit('message', message);
        input.val('');
    });
});

socket.on('message', addMessage);
