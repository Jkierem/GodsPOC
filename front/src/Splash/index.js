import React from 'react'

const Splash = (props) => {
  const { setPage, pages } = props
  return (
    <React.Fragment>
      Splash
      <button onClick={() => setPage(pages.God)}>Become a God</button>
      <button onClick={() => setPage(pages.Peasant)}>Become a Peasan</button>
      <button onClick={() => setPage(pages.Spectator)}>Just watch</button>
    </React.Fragment>
  )
}

export default Splash;