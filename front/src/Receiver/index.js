import React, { useState, useEffect } from 'react'
import FlexContainer from '../FlexContainer'
import io from 'socket.io-client';
import { IO_SERVER } from '../constants';

const EMPTY = '-- Empty Message --'

const Receiver = (props) => {
  const [message, setMessage] = useState("-- No Message --");
  useEffect(() => {
    const chat = io.connect(IO_SERVER);
    chat.on("message", (data) => {
      console.log("received something")
      setMessage(data)
    })
  }, [])
  const { pages, setPage } = props;
  return (
    <React.Fragment>
      <FlexContainer
        direction='column'
        margin='20px'
      >
        <FlexContainer margin='15px'>
          <label>Message:</label>
        </FlexContainer>
        <label>{message || EMPTY}</label>
      </FlexContainer>
      <button onClick={() => setPage(pages.Splash)}>Go to Splash</button>
    </React.Fragment>
  )
}

export default Receiver;