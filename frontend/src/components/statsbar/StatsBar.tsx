import React, { FC } from 'react'
import { StatsCard } from './statscard/StatsCard'
import './statsbar.css'
import { OpenTicketCard } from './statscard/OpenTicketCard'

type StatsBarProps = {
  addBtnToggle : boolean
}

export const StatsBar :FC<StatsBarProps> = ({ addBtnToggle }) => {
  return (
    <section className="statsbar">
      <div className="statsbar__container container center">
        <div className='statsbar__cards'>
          <OpenTicketCard />
          <StatsCard />
        </div>
        <div className="statsbar__buttons">
          {addBtnToggle && ( <button className='btn btn--blue'>Add ticket +</button>)}
        </div>
      </div>
    </section>
  )
}
