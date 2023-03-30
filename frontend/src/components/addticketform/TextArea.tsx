import { useField } from 'formik';
import './TextArea.css';

type TextAreaProps = {
    label: string,
    name: string,
    placeholder: string,
    rows: number
}

export const TextArea = ({ label, ...props }: TextAreaProps) => {
    const [field, meta] = useField(props);

    return (
        <label className='ticket-form__label' htmlFor={label}>
            {label}
            <textarea
                {...field}
                {...props}
                rows={props.rows}
                className='grey--border'
            >
            </textarea>
            {meta.touched && meta.error ? (
                <div className='ticket-form__label--error'>{meta.error}</div>) : null
            }
        </label>
    )
}
