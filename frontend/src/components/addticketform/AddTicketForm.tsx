import { Form, Formik } from "formik";
import { SyntheticEvent, useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { TicketsContextType, UserContextType } from "../../types";
import { Categories } from "./Categories";
import { SelectOptions } from "../shared/SelectOptions";
import { TextArea } from "../shared/TextArea";
import { TextField } from "../shared/TextField";
import { validationSchema } from "./ValidationSchema";
import "./AddTicketForm.css";
import { ITeam, ITicket } from "../../interfaces/interface";
import { TicketsContext } from "../../context/TicketsProvider";
import { useNavigate } from "react-router-dom";
import { Urgency } from "./Urgency";
import Loader from "../loader/Loader";

<<<<<<< HEAD
export const AddTicketForm = () => {
=======
type AddTicketFormProps = {
  selectedTeam: number
}

export const AddTicketForm = ({ selectedTeam }: AddTicketFormProps) => {
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
  const navigate = useNavigate();
  const { dbUser } = useContext(UserContext) as UserContextType;
  const { postingTicket } = useContext(TicketsContext) as TicketsContextType

  if (dbUser?.teams == null) return (<Loader />)

  const initialValues = {
    title: "",
<<<<<<< HEAD
    teamId: dbUser?.teams[0].teamId,
=======
    teamId: selectedTeam,
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
    description: "",
    timeEstimate: "XS",
    urgency: 0,
    categoryNames: [],
    userId: dbUser?.userId,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
<<<<<<< HEAD
=======
        values.teamId = selectedTeam;
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
        setSubmitting(false);
        postingTicket(values as Partial<ITicket>)
        navigate('/');
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
<<<<<<< HEAD
          <SelectOptions label="Team" name="team">
            {dbUser?.teams?.map(t =>
              <option key={t?.teamId} value={t?.teamId}>{t?.name}</option>
            )}
          </SelectOptions>
=======
>>>>>>> 027473ac3d1d23a4dd2f9678620edd51d00d76b7
          <SelectOptions label="Time Estimate" name="timeEstimate">
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </SelectOptions>
          <TextArea
            label="Description"
            name="description"
            rows={6}
            placeholder="Some more info.."
          />
          <Urgency label="Urgency" name="urgency" />
          <Categories label="Categories" />
          <button className="btn btn--blue w-100 ticket-form__submit-btn" type="submit">
            Submit
          </button>
        </Form>
      </div>
    </Formik>
  );
};
