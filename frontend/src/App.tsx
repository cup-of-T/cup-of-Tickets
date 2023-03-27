import { useContext, useEffect, useState } from 'react'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import Header from './components/header/Header'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import { IUserRequest } from './interfaces/interface'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'
import { getUserByEmail, getUsers, postUser } from './services/userApi'


function App() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const tryFetchUser = async () => {
      const accessToken = await getAccessTokenSilently();
      let dbUser = await getUserByEmail(user?.email!, accessToken);
      if (dbUser === null) {
        const newUser: IUserRequest = {
          email: user!.email!,
          imageUrl: user!.picture!
         }
        dbUser = await postUser(newUser, accessToken);
      }
      
    }
    if (isAuthenticated) {
      tryFetchUser();
    }
  },);

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
