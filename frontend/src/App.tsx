import { useContext, useEffect, useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import ProtectedRoute from './pages/ProtectedRoute'
import Profile from './pages/Profile'
import Teams from './pages/Teams'
import { TicketsContext } from './context/TicketsProvider'
import { TicketsContextType, UserContextType } from './types'
import { useAuth0 } from '@auth0/auth0-react'
import { UserContext } from './context/UserProvider'
import { postUser } from './services/userApi'
import Kanban from './pages/Kanban'
import { Login } from './pages/Login'
import { AddTicket } from './pages/AddTicket'
import Dashboard from './pages/TicketDashboard'
import { Archive } from './pages/Archive'
import './pages/pages.css'
import TicketDashboard from './pages/TicketDashboard'



function App() {
  const { tickets, fetchTickets } = useContext(TicketsContext) as TicketsContextType;
  const { dbUser, setDbUser } = useContext(UserContext) as UserContextType;
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [postedUser, setPostedUser] = useState(false);

  const getOrPostUser = async () => {
    const accessToken = await getAccessTokenSilently();
    setDbUser(await postUser(accessToken));
    setPostedUser(true);
  }

  useEffect(() => {
    if (isAuthenticated && !postedUser) {
      getOrPostUser();
    }
    fetchTickets();
  }, [isAuthenticated])

  return (
    <div className="app">
      {isAuthenticated && <>
        <Header />
        <main className="main center">
          <Routes>
            <Route path="/" element={< Navigate to='/dashboard' />}/> 
            <Route path="/dashboard" element={<TicketDashboard />} />
            <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
            <Route path="/kanban" element={<ProtectedRoute component={Kanban} />} />
            <Route path="/addticket" element={<ProtectedRoute component={AddTicket} />} />
            <Route path="/teams" element={<ProtectedRoute component={Teams} />} />
            <Route path="/archive" element={<ProtectedRoute component={Archive} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </>
      }
      {!isAuthenticated &&
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      }
    </div>
  )
}

export default App;