import React, { useState, useEffect } from 'react'
import FlexContainer from '../FlexContainer'
import io from 'socket.io-client'
import { IO_SERVER } from '../constants';

const socket = io(IO_SERVER)

const Emitter = (props) => {
  const [value, setValue] = useState(props.defaultValue);
  const { pages, setPage } = props;

  const handleEmit = (e) => {
    e.preventDefault();
    socket.emit('message', value);
  }

  const handleChange = (e) => setValue(e.target.value)

  return (
    <React.Fragment>
      <FlexContainer direction="column">
        <input onChange={handleChange} />
        <button onClick={handleEmit}>Emit</button>
      </FlexContainer>
      <button onClick={() => setPage(pages.Splash)}>Go to Splash</button>
    </React.Fragment>
  )
}

export default Emitter;