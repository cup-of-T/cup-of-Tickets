import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { IUser } from './interfaces/interface'
import { FetchAllUsers } from './services/ticketApi'

function App() {
  const [users, setUsers] = useState<IUser[]>()


  useEffect(() => {
     async () => { 
      const usersResponse = await FetchAllUsers()
      setUsers(usersResponse)
      console.log(users);
    }
  }, [] )


  return (
    <div className="App">
    <p>hey You!</p>
    </div>
  )
}

export default App
