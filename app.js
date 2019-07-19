const express = require("express");
const app = express();

//Setting up template engine to ejs
app.set("view engine", "ejs");

//Directory for middlewares
app.use(express.static("public"));

//Routes
app.get("/",  (req, res) => {
    res.render("index");
});

server = app.listen(3000);

const io = require("socket.io")(server);

io.on("connection", (socket) => {

	socket.username = "Anonymous";

    //Listening to if username was changed
    socket.on('change_username', (data) => {
        socket.username = data.username;
    });

    //On a new message
    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    });

    //Listening to typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    });
});
