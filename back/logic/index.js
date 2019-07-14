const JGraph = require("../jgraph");
const {
    Graph,
    GenericNodeFactory: NodeFactory,
    UndirectedAdjacencyMatrix: Strategy
} = JGraph;

const NONE = 0;
const FREE = 1;
const OCCUPIED = 2;
const WALL = 3;

const SUCCESS = true;
const FAILURE = false;

const GOD = 'GOD';
const PEASANT = 'PEASANT';
const SPECTATOR = 'SPECTATOR';

const createTile = (state = FREE, owner = NONE) => ({ state, owner })
const createOccupiedTile = (who) => createTile(OCCUPIED, who);
const EmptyTile = createTile();

const createBoard = ({ rows, cols }) => {
    const board = new Graph(NodeFactory, Strategy);
    const nf = NodeFactory;
    const getNodeKey = (row, col) => `${row},${col}`;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const node = nf.create(
                getNodeKey(row, col),
                createTile()
            )
            board.addNode(node);
        }
    }
    return {
        getTiles: () => board.getAllNodes(),
        getWalls: () => board.getAllEdges(),
        isTileOccupied: (row, col) => {
            return board.getNode(getNodeKey(row, col)).state === OCCUPIED;
        },
        getTile: (row, col) => {
            return board.getNode(getNodeKey(row, col))
        },
        setTile: (row, col, value = EmptyTile) => {
            board.getNode(getNodeKey(row, col)).value = value;
        },
        toggleWall: (_from, _to) => {
            const from = getNodeKey(_from.row, _from.col)
            const to = getNodeKey(_to.row, _to.col)
            if (board.hasEdge(from, to)) {
                board.getEdge(from, to).value == FREE ?
                    board.addEdge(from, to, WALL) :
                    board.addEdge(from, to, FREE)
            } else {
                board.addEdge(from, to, WALL);
            }
        },
        canMove: (_from, _to) => {
            const from = getNodeKey(_from.row, _from.col)
            const to = getNodeKey(_to.row, _to.col)
            if (board.hasEdge(from, to)) {
                return board.getEdge(from, to) == FREE
                    && board.getNode(to).state == FREE;
            }
            return true;
        }
    }
}

const createUser = (id, type) => ({
    id,
    type,
    position: { row: -1, col: -1 }
})

const createCornerPicker = (rows, cols) => {
    let i = -1;
    const pos = [
        { row: 0, col: 0 },
        { row: rows - 1, col: 0 },
        { row: 0, col: cols - 1 },
        { row: rows - 1, col: cols - 1 },
    ]
    return () => {
        i = (i + 1) % 4;
        return pos[i];
    }
}

const createUserManager = ({ rows, cols }) => {
    let users = []
    const picker = createCornerPicker(rows, cols)
    return {
        addUser: (type) => {
            const newUser = createUser(users.length, type);
            users = [...users, newUser]
            if (type == PEASANT) {
                newUser.position = picker();
            }
            return newUser;
        },
        getUsers: () => [...users],
        setUserPosition: (id, pos) => { users[id].position = pos },
        getUserPosition: (id) => users[id].position,
    }
}


const movePosition = (pos, dir) => {
    const dirs = {
        UP: { row: -1, col: 0 },
        DOWN: { row: 1, col: 0 },
        LEFT: { row: 0, col: -1 },
        RIGHT: { row: 0, col: 1 }
    }
    const delta = dirs[dir];
    const newPos = {}
    newPos.row = pos.row + delta.row;
    newPos.col = pos.col + delta.col;
    return newPos;
}

const createOperation = (result, status) => ({
    result,
    status,
})
const Failure = (msg) => createOperation(msg, FAILURE);
const Success = (res) => createOperation(res, SUCCESS);

const createSystem = ({
    boardSize
}) => {
    const board = createBoard(boardSize);
    const userManager = createUserManager(boardSize)
    return {
        getState: () => {
            return {
                tiles: board.getTiles(),
                walls: board.getWalls(),
                players: userManager.getUsers()
            }
        },
        move(_who, dir) {
            const who = _who.id ? _who.id : _who;
            const curr = userManager.getUserPosition(who);
            const newPos = movePosition(curr, dir);
            if (board.canMove(curr, newPos)) {
                userManager.setUserPosition(who, newPos);
                board.setTile(curr.row, curr.col, EmptyTile);
                board.setTile(newPos.row, newPos.col, createOccupiedTile(who));
                return this.getState();
            }
        },
        toggleWall(from, to) {
            board.toggleWall(from, to);
            return this.getState()
        },
        addPlayer(type) {
            return userManager.addUser(type);
        },
    }
}

module.exports = createSystem;