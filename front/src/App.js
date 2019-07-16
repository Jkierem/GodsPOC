import React, { useState } from 'react';
import styled from 'styled-components';
import { default as SplashView } from "./Splash";
import { default as BoardView } from "./Board";
import { flex, fullSize, centerFlex } from './Utils';

const AppContainer = styled.div`
  ${flex}
  ${fullSize}
  ${centerFlex}
  flex-direction: column;
`

const Splash = "Spash";
const God = "God";
const Peasant = "Peasant";
const Spectator = "Spectator"

const View = (page, setter) => {
  const pages = {
    Splash, God, Peasant, Spectator
  }
  const props = { pages, setPage: setter }
  switch (page) {
    case Splash:
      return <SplashView {...props} />
    case God:
      return <BoardView {...props} type={God} />
    case Peasant:
      return <BoardView {...props} type={Peasant} />
    case Spectator:
      return <BoardView {...props} type={Spectator} />
    default:
      return <SplashView {...props} />
  }
}

const App = () => {
  const [page, setPage] = useState(Splash)

  return (
    <AppContainer>
      {View(page, setPage)}
    </AppContainer>
  )
}

export default App;