import { useField } from 'formik';
import './SelectOptions.css';

type SelectOptionsProps = {
    label: string,
    name: string,
    children?: React.ReactNode
}

export const SelectOptions = ({ label, children, ...props }: SelectOptionsProps) => {
    const [field, meta] = useField(props);

    return (
        <label className='ticket-form__label' htmlFor={label}>
            {label}
            <select
                {...field}
                {...props}
                className='grey--border base-font'
            >
                {children}
            </select>
            {meta.touched && meta.error ? (
                <div className='ticket-form__label--error'>{meta.error}</div>) : null
            }
        </label>
    )
}
