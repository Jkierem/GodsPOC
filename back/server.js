const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(80, () => console.log("server listeninasfdakljn"));

app.get('/', function (req, res) {
    res.json("HELLO")
});

const room = io
    .of("/message")
    .on('connection', function (socket) {
        console.log("CONNECTION!!!!")
        socket.on('message', function (data) {
            console.log("MESSAGE", data)
            room.emit("message", data)
        })
        socket.on('disconnect', () => { console.log("SOMEONE DISCONNECTED") })
    })