import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { IUser } from './interfaces/interface'
import { FetchAllUsers } from './components/ticketApi'

function App() {
  const [users, setUsers] = useState<IUser>()


  // to be put in services

  
  

  useEffect(() => {
     async () => { setUsers(await FetchAllUsers)}
  }, [] )


  return (
    <div className="App">
     
    </div>
  )
}

export default App
