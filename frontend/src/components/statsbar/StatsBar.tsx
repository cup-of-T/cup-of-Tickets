import React from 'react'
import { StatsCard } from './statscard/StatsCard'
import './statsbar.css'
import { OpenTicketCard } from './statscard/OpenTicketCard'

export const StatsBar = () => {
  return (
    <section className="statsbar">
        <OpenTicketCard />
        <StatsCard />
    </section>
  )
}
