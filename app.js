const express = require("express");
const app = express();
const server = require("http").Server(app);
var port = process.env.PORT || 3000;

//Setting up template engine to ejs
app.set("view engine", "ejs");

//Directory for middlewares
app.use(express.static("public"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Routes
app.get("/",  (req, res) => {
    res.render("index");
});

const io = require("socket.io")(server, {
	cors: {
		origin: '*'
	}
});

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

server.listen(port);
