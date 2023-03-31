import { useField, useFormikContext } from 'formik';
import React, { useRef, useState } from 'react';
import './UploadFile.css'

type UploadFileProps = {
    accept: string;
    children?: React.ReactNode;
}

const FileUpload = ({ accept, children }: UploadFileProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const [previewImg, setPreviewImg] = useState("");
    const [field, meta] = useField("picture");
    const { setFieldValue } = useFormikContext();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        setFieldValue("picture", e.target.files[0]);
        setPreviewImg(URL.createObjectURL(e.target.files[0]));
    };


    return (
        <div className='uploadfile-container' onClick={() => ref.current?.click()}>
            <input
                ref={ref}
                type="file"
                accept={accept}
                onChange={onChange}
                style={{ display: "none" }}
            />
            {previewImg && <img alt="preview image" className='uploadfile-container__preview-image' src={previewImg} />}
            {children}
        </div>
    );
};

export default FileUpload;
