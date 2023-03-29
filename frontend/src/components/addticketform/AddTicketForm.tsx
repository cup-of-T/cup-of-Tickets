import React, { SyntheticEvent, useContext, useState } from 'react'
import { UserContext } from '../../context/UserProvider';
import { UserContextType } from '../../types';
import Loader from '../loader/Loader';
import { TextField } from './TextField'



export const AddTicketForm = () => {
  const { dbUser } = useContext(UserContext) as UserContextType;

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    timeEstimate: '',
    urgency: 0,
    categoryNames: [],
    userId: dbUser?.userId
  });

  const handleChangeEvent = (e: SyntheticEvent) => {
    const event = e.target as HTMLInputElement;
    setFormState((prevState) => ({
      ...prevState, [event.name]: event.value
    }))
  }

  return (
    <form>
      <TextField
        label={'Title'}
        name={'title'}
        placeholder={'Title'}
        value={formState.title}
        onChange={handleChangeEvent}
      />
      <TextField
        label={'Description'}
        name={'description'}
        placeholder={'Description'}
        value={formState.description}
        onChange={handleChangeEvent}
      />
      <TextField
        label={'label'}
        name={'title'}
        placeholder={'Enter your ticket title here please'}
        value={formState.title}
        onChange={handleChangeEvent}
      />

    </form>
  )
}
