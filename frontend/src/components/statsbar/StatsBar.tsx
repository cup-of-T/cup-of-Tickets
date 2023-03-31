import { FC, useContext } from 'react'
import { StatsCard } from './statscard/StatsCard'
import './statsbar.css'
import { OpenTicketCard } from './statscard/OpenTicketCard'
import { UserContext } from '../../context/UserProvider'
import { TicketsContextType, UserContextType } from '../../types'
import { TicketsContext } from '../../context/TicketsProvider'
import { useNavigate } from 'react-router-dom'


type StatsBarProps = {
  addBtnToggle: boolean,
  ticketIds: number[],
  resetTicketsClaims: Function,
  setShowAlert: Function
}

export const StatsBar = ({ addBtnToggle, ticketIds, resetTicketsClaims, setShowAlert }: StatsBarProps) => {
  const { dbUser } = useContext(UserContext) as UserContextType;
  const { updateTicketAssignee } = useContext(TicketsContext) as TicketsContextType;
  const navigate = useNavigate();

  const onCreateButtonClick = () => {
    navigate('/addticket');
  }

  const handleUpdateTicketAssignee = () => {
    ticketIds.forEach((ticketId) => {
      updateTicketAssignee(ticketId, dbUser.userId)
    })
    setShowAlert(true);
    resetTicketsClaims();
  }


  return (
    <section className="statsbar">
      <div className="statsbar__container container center">
        <div className='statsbar__cards'>
          <OpenTicketCard />
          <StatsCard />
        </div>
        <div className="statsbar__buttons">
          {addBtnToggle && (
            <button
              onClick={() => handleUpdateTicketAssignee()}
              className='btn btn--blue'>
              Claim
            </button>)}
          {(dbUser?.role == "Admin" || dbUser?.role == "Manager") &&
            <button
              className='btn btn--green'
              onClick={onCreateButtonClick}>
              Create ticket
            </button>
          }
        </div>
      </div>
    </section>
  )
}