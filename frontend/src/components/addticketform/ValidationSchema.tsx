import * as Yup from "yup";

export const validationSchema = Yup.object({
    title: Yup.string()
        .max(32, "Must be 32 characters or less")
        .required("Required"),
})