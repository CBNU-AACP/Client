import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import GlobalStyle from './styles/global'
import store from './common/store'

import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root'),
)
