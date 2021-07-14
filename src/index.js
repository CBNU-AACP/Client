import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import GlobalStyle from './styles/global'

import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './modules'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root'),
)
