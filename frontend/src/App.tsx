import { useEffect, useState } from 'react'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import Header from './components/header/Header'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import { ITicket, IUser } from './interfaces/interface'
import ProtectedRoute from './pages/ProtectedRoute'
import Profile from './pages/Profile'
import { getTickets } from './services/ticketApi'
import { getUsers } from './services/userApi'


function App() {
  const { isAuthenticated, user, getAccessTokenSilently} = useAuth0();
  const [users, setUsers] = useState<IUser[]>();
  const [tickets, setTickets] = useState<ITicket[]>();

  const getData = async () => {
    const accessToken = await getAccessTokenSilently();
    setUsers(await getUsers(accessToken));
    setTickets(await getTickets(accessToken));
  }

  useEffect(() => {
    getData();
  }, [])

  console.log(isAuthenticated);
  console.log(user);
  console.log(users);
  console.log(tickets);

  return (
    <div className="App">
      <Header />
      <main className="main center">
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
