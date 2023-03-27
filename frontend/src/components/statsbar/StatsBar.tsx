import React, { FC } from 'react'
import { StatsCard } from './statscard/StatsCard'
import './statsbar.css'
import { OpenTicketCard } from './statscard/OpenTicketCard'
import { useAuth0 } from '@auth0/auth0-react'

type StatsBarProps = {
  addBtnToggle : boolean,

}

export const StatsBar :FC<StatsBarProps> = ({ addBtnToggle }) => {
  const { user } = useAuth0();

  return (
    <section className="statsbar">
      <div className="statsbar__container container center">
        <div className='statsbar__cards'>
          <OpenTicketCard />
          <StatsCard />
        </div>
        <div className="statsbar__buttons">
          <button className='btn btn--blue'>Create ticket</button>
          {addBtnToggle && ( <button className='btn btn--blue'>Add ticket +</button>)}
        </div>
      </div>
    </section>
  )
}
