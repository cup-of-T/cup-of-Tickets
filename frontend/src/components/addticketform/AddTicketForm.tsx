import { Form, Formik } from 'formik';
import { useContext, } from 'react'
import { UserContext } from '../../context/UserProvider';
import { UserContextType } from '../../types';
import { Categories } from './Categories';
import { SelectOptions } from './SelectOptions';
import { TextArea } from './TextArea';
import { TextField } from './TextField'
import { validationSchema } from './ValidationSchema';
import "./AddTicketForm.css";

export const AddTicketForm = () => {
  const { dbUser } = useContext(UserContext) as UserContextType;
  const initialValues = {
    title: '',
    description: '',
    timeEstimate: 'm',
    urgency: 0,
    categoryNames: [],
    userId: dbUser?.userId
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
      validationSchema={validationSchema}
    >
      <Form>
        <div className='form-container'>
          <h3>Add a ticket</h3>
          <TextField
            label="Title"
            name="title"
            type="text"
            placeholder='Title'
          />
          <TextArea
            label="Description"
            name="description"
            rows={6}
            placeholder="pls put descp thx"
          />
          <SelectOptions label="Time Estimate" name="timeEstimate">
            <option value="xs">xs</option>
            <option value="s">s</option>
            <option value="m">m</option>
            <option value="l">l</option>
            <option value="xl">l</option>
          </SelectOptions>
          <SelectOptions label="urgency" name="urgency">
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </SelectOptions>
          <Categories />
          <button className='btn btn--bordered' type="submit">submit</button>
        </div>
      </Form>
    </Formik>
  )
}
