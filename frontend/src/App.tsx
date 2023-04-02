import { useContext, useEffect, useInsertionEffect, useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import ProtectedRoute from './pages/ProtectedRoute'
import Profile from './pages/Profile'
import TeamsPage from './pages/TeamsPage'
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
import { getTeam } from './services/teamApi'
import { ITeam } from './interfaces/interface'
import { Team } from './components/team/Team'
import Settings from './pages/Settings'
import { InProgress } from './pages/InProgress'
import { Testing } from './pages/Testing'
import { AddTicketForm } from './components/addticketform/AddTicketForm'



function App() {
  const { tickets, fetchTickets } = useContext(TicketsContext) as TicketsContextType;
  const { dbUser, setDbUser } = useContext(UserContext) as UserContextType;
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [postedUser, setPostedUser] = useState(false);
  const [team, setTeam] = useState<ITeam>({} as ITeam);

  const fetchingTeam = async (teamId: number) => {
    const accessToken = await getAccessTokenSilently();
    const team = await getTeam(teamId, accessToken);
    setTeam(team);
    setSelectedTeam(teamId);
  }

  useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessTokenSilently();
      if (isAuthenticated && !postedUser) {
        setDbUser(await postUser(accessToken));
        setPostedUser(true);
      }
    }
    getData();
  }, [isAuthenticated]);

  useEffect(() => {
    if (dbUser.teams != null) {
      fetchingTeam(dbUser?.teams[0].teamId);
    }
  }, [dbUser.teams]);

  useEffect(() => {
    fetchTickets(selectedTeam);
    fetchingTeam(selectedTeam);
  }, [selectedTeam])

  return (
    <div className="app">
      {isAuthenticated && <>
        <Header setSelectedTeam={setSelectedTeam} />
        <main className="main center">
          <Routes>
            <Route path="/" element={<TicketDashboard teamName={team.name} />} />
            <Route path="/dashboard" element={<TicketDashboard teamName={team.name} />} />
            <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
            <Route path="/kanban" element={<ProtectedRoute component={Kanban} />} />
            <Route path="/addticket" element={<AddTicketForm selectedTeam={selectedTeam} />} />
            <Route path="/teams" element={<TeamsPage team={team} />} />
            <Route path="/archive" element={<ProtectedRoute component={Archive} />} />
            <Route path="/settings" element={<ProtectedRoute component={Settings} />} />
            <Route path="/inprogress" element={<ProtectedRoute component={InProgress} />} />
            <Route path="/testing" element={<ProtectedRoute component={Testing} />} />
            <Route path="*" element={<ProtectedRoute component={NotFound} />} />
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