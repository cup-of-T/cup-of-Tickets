import { Form, Formik, FormikHelpers } from 'formik';
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
    <Formik
      initialValues={formState}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <TextField
          label='Title'
          name='title'
          type="text"
          placeholder='Title'
          value={formState.title}
          onChange={handleChangeEvent}
        />
        <label>
          description
          <textarea
            name='description'
            placeholder={'Enter your ticket description here please'}
            value={formState.description}
            onChange={handleChangeEvent}
          />
        </label>
      </Form>
    </Formik>
  )
}
