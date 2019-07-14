const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const createSystem = require('./logic');

server.listen(8080, () => console.log("server listenning"));

app.get('/', function (req, res) {
    res.json("HELLO")
});

const room = io
    .of("/game")
    .on('connection', function (socket) {
        console.log("CONNECTION!!!!")
        socket.on('role', function (data) {
            room.emit("message", data)
        })
        socket.on('disconnect', () => { console.log("SOMEONE DISCONNECTED") })
    })

const settings = {
    boardSize: {
        rows: 3,
        cols: 3,
    }
}
const sys = createSystem(settings)
const from = { row: 0, col: 0 }
const to = { row: 1, col: 0 };
sys.board.toggleWall(from, to);
sys.board.setTile(0, 0, 5)
console.log(sys.board.getTiles())
console.log(sys.board.getWalls())
console.log(sys.board.canMove(from, to))
