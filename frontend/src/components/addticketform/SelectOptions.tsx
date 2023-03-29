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
        <label className='select' htmlFor={label}>
            {label}
            <select
                {...field}
                {...props}
            >
                {children}
            </select>
            {meta.touched && meta.error ? (
                <div className='select__error'>{meta.error}</div>) : null
            }
        </label>
    )
}
