import { useState } from 'react'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './components/LoginButton'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
