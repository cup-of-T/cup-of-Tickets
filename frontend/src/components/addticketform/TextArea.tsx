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
        <label className='text-area' htmlFor={label}>
            {label}
            <textarea
                {...field}
                {...props}
                rows={props.rows}
            >
            </textarea>
            {meta.touched && meta.error ? (
                <div className='text-area__error'>{meta.error}</div>) : null
            }
        </label>
    )
}
