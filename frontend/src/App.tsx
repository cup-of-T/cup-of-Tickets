import { useContext, useEffect, useState } from 'react'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import { IUser } from './interfaces/interface'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'
import { getTickets, getUsers } from './services/ticketApi'
import { TicketsContext } from './context/TicketsProvider'
import { TicketsContextType } from './types'


function App() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { tickets, fetchTickets } = useContext(TicketsContext) as TicketsContextType;
  const [users, setUsers] = useState<IUser[]>();

  const getData = async () => {
    const accessToken = await getAccessTokenSilently();
    setUsers(await getUsers(accessToken));
  }

  useEffect(() => {
    getData();
    fetchTickets();
  }, [])

  console.log(isAuthenticated);
  console.log(user);
  console.log(users);

  return (
    <div className="App">
      <Header />
      <main className="main container center">
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
