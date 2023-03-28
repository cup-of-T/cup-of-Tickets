import React from 'react'

type TextFieldProps = {
  label: string,
  name: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string,
  value: string
}

export const TextField = (props: TextFieldProps) => {
  return (
    <label>
      {props.label}
      <input
        type="text"
        {...props}
      />
    </label>
  )
}
