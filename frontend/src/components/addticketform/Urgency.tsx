import { useField, useFormikContext } from "formik";
import React from "react";
import "./urgency.css";

type UrgencyProps = {
  label: string;
  name: string;
};

export const Urgency = ({ label, name }: UrgencyProps) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField("urgency");

  const values = [
    { value: 0, classColor: "color-green" },
    { value: 1, classColor: "color-orange" },
    { value: 2, classColor: "color-red" },
  ];

  return (
    <>
      <label className="ticket-form__label" htmlFor={label}>{label}</label>
      <div className="urgency-container">
      {values.map(({ value, classColor }) => (
        <button
          className="urgency__btn"
          key={label}
          onClick={() => setFieldValue("urgency", value)}
          type="button"
          value={value}
        >
          <i
            className={
              " fa-solid fa-triangle-exclamation urgency__sign " + (field.value == value ? "urgency_sign--border " : "" ) + classColor
            }
          ></i>
        </button>
      ))}
      </div>
    </>
    //   {meta.touched && meta.error ? <div>{meta.error}</div> : null}
  );
};
