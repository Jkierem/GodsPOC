import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import io from 'socket.io-client'
import { IO_SERVER } from '../constants';
import { flex, centerFlex, fullSize } from '../Utils'

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
  ${fullSize}
  ${centerFlex}
`
const BoardGrid = styled.div`
  display: grid;
  grid-template-rows: ${({ rows }) => generateTemplate(rows)};
  grid-template-columns: ${({ cols }) => generateTemplate(cols)};
  height: 90vh;
  width: 90vw;
`

const Board = (props) => {
  const { type, setPage, pages } = props

  const [gameState, setGameState] = useState({});
  const [player, setPlayer] = useState({});
  const [size, setSize] = useState({ rows: 10, cols: 10 });

  useEffect(() => {

    window.onbeforeunload = () => {
      socket.removeAllListeners()
      socket.emit("kill", playerId);
    }

    socket.emit("size", (data) => {
      console.log("SIZE:", data)
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
      <BoardGrid {...size}>
      </BoardGrid>
      <button onClick={() => {
        socket.emit("kill", player)
        setPage(pages.Splash)
      }}>Go Back</button>
    </div>
  )
}

export default Board;