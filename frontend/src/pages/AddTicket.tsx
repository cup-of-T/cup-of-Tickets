import { AddTicketForm } from '../components/addticketform/AddTicketForm'

type AddTicketProps = {
  selectedTeam: number
}

export const AddTicket = ({ selectedTeam }: AddTicketProps) => {

  return (
    <AddTicketForm selectedTeam={selectedTeam} />
  )
}
