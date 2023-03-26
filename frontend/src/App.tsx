import { useEffect, useState } from 'react'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import { ITicket, IUser } from './interfaces/interface'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'
import { getTickets, getUsers } from './services/ticketApi'
import { Sidebar } from './components/sidebar/Sidebar'

function App() {
  const { isAuthenticated, user } = useAuth0();
  const [users, setUsers] = useState<IUser[]>();
  const [tickets, setTickets] = useState<ITicket[]>();

  const getData = async () => {
    setUsers(await getUsers());
    setTickets(await getTickets());
  }

  useEffect(() => {
    getData();
  }, [])

  console.log(isAuthenticated);
  console.log(users);
  console.log(tickets);

  return (
    <div className="App">
      <Header />
      <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </main>
    </div>
  )
}

export default App;
