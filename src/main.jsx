import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import { AuthContextProvider } from './store/AuthContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
      </AuthContextProvider>
      
  </StrictMode>,
)
