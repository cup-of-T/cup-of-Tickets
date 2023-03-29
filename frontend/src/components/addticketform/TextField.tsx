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
    <label className='text-field' htmlFor={label}>
      {label}
      <input
        {...field}
        {...props}
      />

      {meta.touched && meta.error ? (
        <div className='text-field__error'>{meta.error}</div>) : null
      }
    </label>
  )
}
