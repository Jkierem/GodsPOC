const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const createSystem = require('./logic');

server.listen(8080, () => console.log("server listenning"));

app.get('/', function (req, res) {
    res.json("HELLO")
});

const settings = {
    boardSize: {
        rows: 20,
        cols: 20,
    }
}
const sys = createSystem(settings)

const room = io
    .of("/game")
    .on('connection', function (socket) {
        console.log("CONNECTION!!!!")
        socket.on("role", (type) => {
            socket.emit("player", sys.addPlayer(type));
            room.emit("state", sys.getState())
        })

        socket.on("move", (who, dir) => {
            room.emit("state", sys.move(who, dir));
        })

        socket.on("wall", (from, to) => {
            room.emit("state", sys.toggleWall(from, to));
        })
    })
