import { useEffect, useState } from 'react'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './components/LoginButton'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import { IUser } from './interfaces/interface'
import { FetchAllUsers } from './services/ticketApi'

function App() {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);
  const [users, setUsers] = useState<IUser[]>()


  useEffect(() => {
    async () => {
      const usersResponse = await FetchAllUsers()
      setUsers(usersResponse)
      console.log(users);
    }
  }, [])


  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
