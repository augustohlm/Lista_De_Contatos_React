import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import EstiloGlobal from './styles/global'
import { Provider } from 'react-redux'
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <EstiloGlobal />
      <App />
    </Provider>
  </React.StrictMode>
)
