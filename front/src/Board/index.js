import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { IO_SERVER } from '../constants';

let socket = io(IO_SERVER)

const Board = (props) => {
  const { type, setPage, pages } = props

  const [gameState, setGameState] = useState({});
  const [player, setPlayer] = useState({});
  useEffect(() => {
    socket.emit("size", (data) => {
      console.log("SIZE:", data)
    })

    socket.on("state", (data) => {
      console.log("STATE:", data);
      setGameState(data.result);
    })

    socket.emit("role", type, (data) => {
      console.log("PLAYER:", data)
      setPlayer(data.result)
    })

    return () => {
      socket.removeAllListeners();
    }
  }, [type])

  return (
    <div>
      Board
      <p>
        You are a {player.type}
      </p>
      <p>
        Active Players: {gameState.players ? gameState.players.length : "connecting..."}
      </p>
      <button onClick={() => {
        socket.emit("kill", player)
        setPage(pages.Splash)
      }}>Go Back</button>
    </div>
  )
}

export default Board;