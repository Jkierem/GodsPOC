const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const createSystem = require('./logic');

server.listen(8080, () => console.log("server listenning"));

app.get('/', function (req, res) {
    res.json("HELLO")
});

const eventLog = (event) => console.log(`Received ${event} event`)

const settings = {
    boardSize: {
        rows: 10,
        cols: 10,
    }
}
const sys = createSystem(settings)

const room = io
    .of("/game")
    .on('connection', function (socket) {
        console.log("CONNECTION!!!!")

        socket.on("size", (ack) => {
            eventLog("SIZE")
            ack(sys.getSize())
        })

        socket.on("role", (type, ack) => {
            eventLog("ROLE")
            ack(sys.addPlayer(type));
            room.emit("state", sys.getState())
        })

        socket.on("move", (who, dir, ack) => {
            eventLog("MOVE")
            const res = sys.move(who, dir);
            if (res.status) {
                ack(true)
                room.emit("state", res);
            } else {
                ack(false)
            }
        })

        socket.on("wall", (from, to) => {
            eventLog("WALL")
            room.emit("state", sys.toggleWall(from, to));
        })

        socket.on("kill", (who) => {
            eventLog(`KILL ${who.id || who}`)
            sys.kill(who)
            room.emit("state", sys.getState())
        })
    })
