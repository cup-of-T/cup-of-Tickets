import { useEffect, useState } from 'react'
import './App.css'
import { IUser } from './interfaces/interface'
import { getUsers } from './services/ticketApi'

function App() {
  const [users, setUsers] = useState<IUser[]>()

  const getData = async () => {
    setUsers(await getUsers());
    // setSports(await getSports());
    // setDogs(await getDogs());
  }

  useEffect(() => {
    getData();
    console.log(users);
  }, [])


  return (
    <div className="App">
      <p>hey You!</p>
    </div>
  )
}

export default App
