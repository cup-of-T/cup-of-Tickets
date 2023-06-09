import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import AuthProvider from './authorization/AuthProvider'
import TicketProvider from './context/TicketsProvider'
import UserProvider from './context/UserProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TicketProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </TicketProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
