import { useContext } from 'react'
import { StatsCard } from './statscard/StatsCard'
import './statsbar.css'
import { OpenTicketCard } from './statscard/OpenTicketCard'
import { UserContext } from '../../context/UserProvider'
import { TicketsContextType, UserContextType } from '../../types'
import { TicketsContext } from '../../context/TicketsProvider'
import { useNavigate } from 'react-router-dom'
import { updateTicketAssignedTo } from '../../services/ticketApi'
import { useAuth0 } from '@auth0/auth0-react'


type StatsBarProps = {
  addBtnToggle: boolean,
  ticketIds: number[],
  resetTicketsClaims: Function,
  setShowAlert: Function
}

export const StatsBar = ({ addBtnToggle, ticketIds, resetTicketsClaims, setShowAlert }: StatsBarProps) => {
  const { dbUser } = useContext(UserContext) as UserContextType;
  const { getAccessTokenSilently } = useAuth0();
  const { tickets, setTickets } = useContext(TicketsContext) as TicketsContextType;
  const navigate = useNavigate();

  const onCreateButtonClick = () => {
    navigate('/addticket');
  }

  const handleUpdateTicketAssignee = async () => {
    setShowAlert(true);
    const accessToken = await getAccessTokenSilently();
    const newArr = [...tickets];
    const indexArray: number[] = [];

    ticketIds.forEach((ticketId) => {
      updateTicketAssignedTo(ticketId, dbUser.userId, accessToken);
      indexArray.push(newArr.findIndex(t => t.ticketId == ticketId));
    })

    indexArray.forEach(i => newArr[i].assignedUser = dbUser);
    setTickets(newArr);

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