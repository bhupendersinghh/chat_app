$(function() {
    var socket = io.connect("http://localhost:3000/");

    var message = $("#message");
    var username = $("#username");
    var send_message = $("#send_message");
    var send_username = $("#send_username");
    var chatroom = $("#chatroom");
    var feedback = $("#feedback");

    //Emit a message
    send_message.click(function() {
        console.log(message.val());
        socket.emit('new_message', {message : message.val()});
    });

    //Listening to a new message
    socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
	});

    //Emit a username
    send_username.click(function(){
		socket.emit('change_username', {username : username.val()});
	});

    //Emitting typing on keypress
    message.bind("keypress", () => {
		socket.emit('typing');
	});

    //Listening if someone in typing
    socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>");
	});
});