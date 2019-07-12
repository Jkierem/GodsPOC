import React, { useState } from 'react';
import styled from 'styled-components';
import { default as SplashView } from "./Splash";
import { default as EmitterView } from './Emitter';
import { default as ReceiverView } from './Receiver';

const JustOf = (value) => () => value
const dimensions = (width, height) => `
  width: ${width};
  height: ${height};
`
const fullSize = JustOf(dimensions("100vw", "100vh"))
const flex = JustOf("display: flex;");
const flexPosition = (main = "center", cross = "center") => `
    justify-content: ${main};
    align-items: ${cross};
`
const centerFlex = JustOf(flexPosition())

const AppContainer = styled.div`
  ${flex}
  ${fullSize}
  ${centerFlex}
  flex-direction: column;
`

const Splash = "Spash";
const Emitter = "Emitter";
const Receiver = "Receiver";

const View = (page, setter) => {
  const pages = {
    Splash, Emitter, Receiver
  }
  const props = { pages, setPage: setter }
  switch (page) {
    case Splash:
      return <SplashView {...props} />
    case Emitter:
      return <EmitterView {...props} />
    case Receiver:
      return <ReceiverView {...props} />
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