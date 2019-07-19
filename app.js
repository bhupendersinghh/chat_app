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

server = app.listen(3000, () => {
    console.log("Server Started!");
});

const io = require("socket.io")(server);

io.on("connection", (socket) => {
    console.log("New User Connected")

    //Setting default username
    socket.username = "Anonymous"

    socket.on('change_username', (data) => {
        socket.username = data.username;
        console.log(socket.username);
    })

    socket.on("new_message", (data) => {
        io.sockets.emit("new_message", {message: data.message, username: socket.username})
    });
});
