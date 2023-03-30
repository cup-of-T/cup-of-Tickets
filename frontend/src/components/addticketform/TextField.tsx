import { useField } from 'formik';
import './TextField.css';

type TextFieldProps = {
  label: string,
  name: string,
  type: string,
  placeholder: string,
}

export const TextField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);

  return (
    <label className='ticket-form__label' htmlFor={label}>
      {label}
      <input
        {...field}
        {...props}
        className='grey--border'
      />

      {meta.touched && meta.error ? (
        <div className='ticket-form__label--error'>{meta.error}</div>) : null
      }
    </label>
  )
}
