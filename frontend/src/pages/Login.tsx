import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext } from 'react'
import Loader from '../components/loader/Loader';
import { LoginCard } from '../components/logincard/LoginCard';
import { UserContext } from '../context/UserProvider'
import { UserContextType } from '../types'
import '../components/logincard/LoginCard.css'

export const Login: React.FC = () => {
  const { isLoading } = useAuth0();
  return (
    <div className="login-card">
      {isLoading
        ? <Loader />
        : <LoginCard />
      }

    </div>
  )
}
