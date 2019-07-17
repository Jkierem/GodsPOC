import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import io from 'socket.io-client'
import { IO_SERVER } from '../constants';
import { flex, centerFlex, fullSize, partition } from '../Utils'

let socket = io(IO_SERVER)
let playerId = undefined

const generateTemplate = (amount) => {
  let template = "1fr ";
  for (let i = 0; i < amount - 1; i++) {
    template += "0.3fr 1fr "
  }
  return template
}

const Tile = styled.div`
  ${flex}
  ${centerFlex}
  box-sizing: border-box;
  border-color: 1px solid black;
  background-color: ${props => props.wall ? "black" : "white"};
`
const BoardGrid = styled.div`
  display: grid;
  grid-template-rows: ${({ rows }) => generateTemplate(rows)};
  grid-template-columns: ${({ cols }) => generateTemplate(cols)};
  height: 90vh;
  width: 90vw;
  position: relative;
`

const wallRow = (amount, prefix) => {
  const tiles = []
  for (let i = 0; i < amount; i++) {
    tiles.push(<Tile key={`${prefix}-${i}-rowwall`} wall></Tile>)
  }
  return tiles;
}

const renderTiles = (gameState, boardSize) => {
  const { rows, cols } = boardSize;
  const { tiles } = gameState;
  return partition(tiles, cols).map((row, index) => {
    const elements = row.map(({ key, value }, index) => {
      if (index === 0) {
        return <Tile key={key}></Tile>
      } else {
        return <React.Fragment>
          <Tile wall key={`wall${key}`}></Tile>
          <Tile key={key}></Tile>
        </React.Fragment>
      }
    });
    if (index !== 0) {
      return [...wallRow((2 * cols) - 1, index), ...elements];
    }
    return elements;
  })

}

const Board = (props) => {
  const { type, setPage, pages } = props

  const [gameState, setGameState] = useState(false);
  const [player, setPlayer] = useState({});
  const [size, setSize] = useState({ rows: 10, cols: 10 });

  useEffect(() => {

    window.onbeforeunload = () => {
      socket.removeAllListeners()
      socket.emit("kill", playerId);
    }

    socket.emit("size", (data) => {
      console.log("SIZE:", data)
      setSize(data.result)
    })

    socket.on("state", (data) => {
      console.log("STATE:", data);
      setGameState(data.result);
    })

    socket.emit("role", type, (data) => {
      console.log("PLAYER:", data)
      playerId = data.result.id;
      setPlayer(data.result)
    })

    return () => {
      socket.removeAllListeners();
      window.onbeforeunload = () => { }
      playerId = undefined
    }
  }, [type])

  return (
    <div>
      {
        !gameState ?
          <div>Loading...</div>
          :
          <BoardGrid {...size}>
            {renderTiles(gameState, size)}
          </BoardGrid>
      }
      <button onClick={() => {
        socket.emit("kill", player)
        setPage(pages.Splash)
      }}>Go Back</button>
    </div>
  )
}

export default Board;