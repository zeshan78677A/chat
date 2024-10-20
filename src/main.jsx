import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter} from 'react-router-dom'
import chatStore from './Redux/chatStore.js'
import { Provider } from 'react-redux'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={chatStore}><App /></Provider>
</BrowserRouter>
)
