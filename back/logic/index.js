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

const prop = (att) => (obj) => obj ? obj[att] : undefined
const createLens = att => (obj, value) => {
    if (value !== undefined) {
        obj ? obj[att] = value : void 0;
    } else {
        return prop(att)(obj);
    }
}

const createBoard = ({ rows, cols }) => {
    const board = new Graph(NodeFactory, Strategy);
    const nf = NodeFactory;
    const Row = prop("row");
    const Col = prop("col");
    const State = prop("state");
    const Value = createLens("value");
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
            return State(board.getNode(getNodeKey(row, col))) === OCCUPIED;
        },
        getTile: (row, col) => {
            return board.getNode(getNodeKey(row, col))
        },
        setTile: (row, col, value = EmptyTile) => {
            Value(board.getNode(getNodeKey(row, col)), value);
        },
        toggleWall: (_from, _to) => {
            const from = getNodeKey(Row(_from), Col(_from))
            const to = getNodeKey(Row(_to), Col(_to))
            if (board.hasEdge(from, to)) {
                Value(board.getEdge(from, to)) == FREE ?
                    board.addEdge(from, to, WALL) :
                    board.addEdge(from, to, FREE)
            } else {
                board.addEdge(from, to, WALL);
            }
        },
        canMove: (_from, _to) => {
            const from = getNodeKey(Row(_from), Col(_from))
            const to = getNodeKey(Row(_to), Col(_to))
            if (board.hasEdge(from, to)) {
                return Value(board.getEdge(from, to)) == FREE
                    && State(board.getNode(to)) == FREE;
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
    const Position = createLens("position")
    let autoId = -1;
    return {
        addUser: (type) => {
            autoId++;
            const newUser = createUser(autoId, type);
            users = [...users, newUser]
            if (type.toUpperCase() == PEASANT) {
                Position(newUser, picker());
            }
            return newUser;
        },
        getUsers: () => [...users],
        setUserPosition: (id, pos) => { Position(users[id], pos) },
        getUserPosition: (id) => Position(users[id]),
        kill: (_who) => {
            const who = _who.id !== undefined ? _who.id : _who;
            users = users.filter(x => x.id !== who);
        }
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

const isBetween = (start, end) => (value) => start <= value && value < end

const createValidator = ({ rows, cols }) => ({ row, col }) => {
    return isBetween(0, rows)(row) && isBetween(0, cols)(col)
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
    const isValid = createValidator(boardSize)
    return {
        getState: () => {
            return Success({
                tiles: board.getTiles(),
                walls: board.getWalls(),
                players: userManager.getUsers()
            })
        },
        move(_who, dir) {
            const who = _who.id !== undefined ? _who.id : _who;
            const curr = userManager.getUserPosition(who);
            const newPos = movePosition(curr, dir);
            if (board.canMove(curr, newPos) && isValid(newPos)) {
                userManager.setUserPosition(who, newPos);
                board.setTile(curr.row, curr.col, EmptyTile);
                board.setTile(newPos.row, newPos.col, createOccupiedTile(who));
                return this.getState();
            } else {
                return Failure(this.getState().result);
            }
        },
        toggleWall(from, to) {
            board.toggleWall(from, to);
            return Success(this.getState())
        },
        addPlayer(type) {
            return Success(userManager.addUser(type))
        },
        getSize() {
            return Success(boardSize)
        },
        kill(who) {
            userManager.kill(who)
        }
    }
}

module.exports = createSystem;