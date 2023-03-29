import { Form, Formik } from "formik";
import { SyntheticEvent, useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { TicketsContextType, UserContextType } from "../../types";
import { Categories } from "./Categories";
import { SelectOptions } from "./SelectOptions";
import { TextArea } from "./TextArea";
import { TextField } from "./TextField";
import { validationSchema } from "./ValidationSchema";
import "./AddTicketForm.css";
import { ITicket } from "../../interfaces/interface";
import { TicketsContext } from "../../context/TicketsProvider";

export const AddTicketForm = () => {
  const { dbUser } = useContext(UserContext) as UserContextType;
  const { postingTicket } = useContext(TicketsContext) as TicketsContextType
  const initialValues = {
    title: "",
    description: "",
    timeEstimate: "m",
    urgency: 0,
    categoryNames: [],
    userId: dbUser?.userId,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values : ITicket, setSubmitting :(isSubmitting : boolean) => void ) => {
        setSubmitting(false);
        postingTicket( values)
      }}
      validationSchema={validationSchema}
    >
      <div className="form-background">
        <Form className="ticket-form">
          <h2 className="ticket-form__title">Add a ticket</h2>
          <TextField
            label="Title"
            name="title"
            type="text"
            placeholder="Title.."
          />
          <TextArea
            label="Description"
            name="description"
            rows={6}
            placeholder="Some more info.."
          />
          <SelectOptions label="Time Estimate" name="timeEstimate">
            <option value="xs">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
          </SelectOptions>
          <SelectOptions label="Urgency" name="urgency">
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </SelectOptions>
          <Categories label="Categories"/>
          <button className="btn btn--blue w-100 ticket-form__submit-btn" type="submit">
            submit
          </button>
        </Form>
      </div>
    </Formik>
  );
};
