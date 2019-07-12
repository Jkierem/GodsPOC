import React from 'react'

const Splash = (props) => {
  const { setPage, pages } = props
  return (
    <React.Fragment>
      Splash
      <button onClick={() => setPage(pages.Emitter)}>Go to Emitter</button>
      <button onClick={() => setPage(pages.Receiver)}>Go to Receiver</button>
    </React.Fragment>
  )
}

export default Splash;