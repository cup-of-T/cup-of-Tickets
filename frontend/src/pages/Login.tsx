import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import Loader from '../components/loader/Loader';
import { LoginCard } from '../components/logincard/LoginCard';
import '../components/logincard/LoginCard.css'

export const Login: React.FC = () => {
  const { isLoading } = useAuth0();
  return (
    <div>
      {isLoading

        ? <div className="loader-container"><Loader /></div>
        : <LoginCard />
      }

    </div>
  )
}
