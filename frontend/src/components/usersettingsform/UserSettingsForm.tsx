import { Form, Formik } from "formik";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { UserContextType } from "../../types";
import { TextField } from "../shared/TextField";
import { validationSchema } from "./ValidationSchema";
import "./UserSettingsForm.css";
import UploadFile from "../shared/UploadFile";
import { putUser } from "../../services/userApi";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../loader/Loader";

export const UserSettingsForm = () => {
  const { dbUser, setDbUser } = useContext(UserContext) as UserContextType;
  const { getAccessTokenSilently } = useAuth0();

  const initialValues = {
    name: dbUser.name == undefined ? "" : dbUser.name,
    picture: '',
    userId: dbUser?.userId,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(false);
        const formData = new FormData();
        formData.append('Name', values.name);
        formData.append('Picture', values.picture);
        putUser(await getAccessTokenSilently(), dbUser?.userId, formData)
          .then(response => {
            setDbUser(prevState => ({ ...prevState, imageUrl: response.imageUrl, name: response.name }))
          });

      }}
      validationSchema={validationSchema}
    >
      <div className="form-background">
        <Form className="user-form">
          <h2 className="user-form__title">User Settings</h2>
          <TextField
            label="Name"
            name="name"
            type="text"
            placeholder="name.."
          />
          <UploadFile accept="image/*">
            <button type="button" className="btn">Add picture</button>
          </UploadFile>
          <button className="btn btn--blue w-100 user-form__submit-btn" type="submit">
            Save changes
          </button>
        </Form>
      </div>
    </Formik>
  );
};
