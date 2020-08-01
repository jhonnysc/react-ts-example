import React, { StrictMode } from 'react'
import { Provider } from 'react-redux'

import GlobalStyle from '@/assets/styles/global'

import Routes from './routes'
import history from './services/history'
import store from './store'

const App: React.FC = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <Routes history={history} />
        <GlobalStyle />
      </Provider>
    </StrictMode>
  )
}

export default App
