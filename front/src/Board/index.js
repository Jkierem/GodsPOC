import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import io from 'socket.io-client'
import { IO_SERVER } from '../constants';
import { flex, centerFlex, partition } from '../Utils'

//const NONE = 0;
//const FREE = 1;
const OCCUPIED = 2;
const WALL = 3;

let socket = io(IO_SERVER)
let playerId = undefined

const generateTemplate = (amount) => {
  let template = "1fr ";
  for (let i = 0; i < amount - 1; i++) {
    template += "8px 1fr "
  }
  return template
}

const Tile = styled.div`
  ${flex}
  ${centerFlex}
  position: relative;
  box-sizing: border-box;
  border: ${props => props.wall ? "1px solid black" : "none"};
  background-color: ${ props => props.wall && props.active ? "black" : props.yours ? "red" : "white"};
`
const BoardGrid = styled.div`
  display: grid;
  grid-template-rows: ${ ({ rows }) => generateTemplate(rows)};
  grid-template-columns: ${ ({ cols }) => generateTemplate(cols)};
  height: 90vh;
  width: 90vw;
  position: relative;
`

const wallRow = (walls, rowIndex, amount, prefix, onWallClick) => {
  const tiles = []
  for (let i = 0; i < amount; i++) {
    const from = getPositionFromKey(`${rowIndex}, ${Math.floor(i / 2)} `)
    const to = { ...from, row: from.row - 1 };
    const isWall = i % 2 === 0
    const isActive = walls.some(wall =>
      wall.start === `${from.row},${from.col}` &&
      wall.end === `${to.row},${to.col}` &&
      wall.value === WALL
    )
    tiles.push(
      <Tile
        wall
        key={`${prefix}-${i}-rowwall`}
        onClick={isWall ? () => onWallClick({ from, to }) : () => { }}
        active={!isWall || isActive}
      ></Tile>
    )
  }
  return tiles;
}

const getPositionFromKey = (key) => {
  const [row, col] = key.split(",").map(Number)
  return { row, col };
}

const createRow = (player, onWallClick, walls = []) => (t, index) => {
  const from = getPositionFromKey(t.key);
  const to = { ...from, col: from.col - 1 }
  const handleWallClick = () => onWallClick({ from, to });
  const isActive = walls.some(wall =>
    wall.start === `${from.row},${from.col}` &&
    wall.end === `${to.row},${to.col}` &&
    wall.value === WALL
  )
  const isOccupied = t.value.state === OCCUPIED;
  const isYours = t.value.owner === player.id;
  return <React.Fragment key={`fragment-${t.key}`}>
    {index !== 0 &&
      <Tile wall active={isActive} key={`${t.key}-wall`} onClick={handleWallClick}></Tile>
    }
    <Tile key={t.key} yours={isYours}>{isOccupied ? t.value.owner : ""}</Tile>
  </React.Fragment>
}

const renderTiles = (player, gameState, boardSize, onWallClick) => {
  const { cols } = boardSize;
  const gridSpaces = (2 * cols) - 1;
  const { tiles, walls } = gameState;
  const rowsPartions = partition(tiles, cols);
  const elements = rowsPartions.map((rowInfo, index) => {
    if (index === 0) {
      return rowInfo.map(createRow(player, onWallClick, walls))
    } else {
      return <React.Fragment key={`fragment-${index}-container`}>
        {wallRow(walls, index, gridSpaces, index, onWallClick)}
        {rowInfo.map(createRow(player, onWallClick, walls))}
      </React.Fragment>
    }
  })
  return elements
}

const eventLog = (on) => (...waht) => on ? console.log(...waht) : void 0;
const log = eventLog(true)

const Board = (props) => {
  const { type, setPage, pages } = props

  const [gameState, setGameState] = useState(false);
  const [player, setPlayer] = useState({});
  const [size, setSize] = useState({ rows: 10, cols: 10 });

  useEffect(() => {

    const handleKeyup = (e) => {
      if (type === "PEASANT") {
        switch (e.code) {
          case "KeyW":
            socket.emit("move", playerId, "UP")
            break;
          case "KeyS":
            socket.emit("move", playerId, "DOWN")
            break;
          case "KeyA":
            socket.emit("move", playerId, "LEFT")
            break;
          case "KeyD":
            socket.emit("move", playerId, "RIGHT")
            break;
          default: break;
        }
      }
    }

    window.onbeforeunload = () => {
      socket.removeAllListeners()
      socket.emit("kill", playerId);
    }

    socket.emit("size", (data) => {
      log("SIZE:", data)
      setSize(data.result)
    })

    socket.on("state", (data) => {
      log("STATE:", data);
      setGameState(data.result);
    })

    socket.emit("role", type, (data) => {
      log("PLAYER:", data)
      playerId = data.result.id;
      setPlayer(data.result)
      window.addEventListener("keyup", handleKeyup)
    })

    return () => {
      socket.removeAllListeners();
      window.onbeforeunload = () => { }
      window.removeEventListener("keyup", handleKeyup)
      playerId = undefined
    }
  }, [type])

  const handleWallClick = ({ from, to }) => {
    if (type === "GOD")
      socket.emit("wall", from, to);
  }

  return (
    <div>
      {
        !gameState ?
          <div>Loading...</div>
          :
          <BoardGrid {...size}>
            {renderTiles(player, gameState, size, handleWallClick)}
          </BoardGrid>
      }
      <button onClick={() => {
        socket.emit("kill", player)
        setPage(pages.Splash)
      }}>Go Back</button>
      <p>You are player number {player.id}</p>
    </div>
  )
}

export default Board;