import { useField } from 'formik';
import React from 'react'

type TextFieldProps = {
  label: string,
  name: string,
  type: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string,
  value: string
}

export const TextField = (props: TextFieldProps) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.name}>
        {props.label}
        <input
          {...field}
          {...props}
        />
      </label>
      {meta.touched && meta.error ? (
        <div>{meta.error}</div>) : null
      }
    </>
  )
}
