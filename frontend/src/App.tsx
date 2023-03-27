import { useContext, useEffect } from 'react'
import './App.css'
import Header from './components/header/Header'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import ProtectedRoute from './pages/ProtectedRoute'
import Profile from './pages/Profile'
import { TicketsContext } from './context/TicketsProvider'
import { TicketsContextType, UserContextType } from './types'


function App() {
  const { tickets, fetchTickets } = useContext(TicketsContext) as TicketsContextType;


  useEffect(() => {
    fetchTickets();
  }, [])

  console.log(tickets);

  return (
    <div className="app">
      <Header />
      <main className="main center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
          <Route path="/callback" element={<ProtectedRoute component={Profile} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;