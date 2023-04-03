import React from 'react'
import { AddTicketForm } from '../components/addticketform/AddTicketForm'

<<<<<<< HEAD
export const AddTicket = () => {

  return (
    <AddTicketForm />
=======
type AddTicketProps = {
  selectedTeam: number
}

export const AddTicket = ({ selectedTeam }: AddTicketProps) => {

  return (
    <AddTicketForm selectedTeam={selectedTeam} />
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
  )
}
