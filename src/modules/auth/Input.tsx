import { css } from '@emotion/css';
import { Field } from 'formik';
import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    required?: boolean;
    type?: 'text' | 'password';
    autoCapitalize?: 'off' | 'on';
}

const styles = {
    inputContainer: css`
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 15px;
    `,
    inputLabel: css`
        margin-bottom: 5px;
        font-weight: normal;
        color: #333;
        font-size: 1em; /* Adjust label font size */
        text-align: left; /* Align label to the left */
        position: relative;
        left: 5px;
    `,
    inputField: css`
        padding: 3.5% 8px;
        margin-top: 5px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
        outline: none;
        transition: border-color 0.3s ease;
        font-size: 1em;

        &:focus {
            border-color: dodgerblue;
        }
    `
};

const TextInput: React.FC<TextInputProps> = ({
    label,
    name,
    type = 'text',
    required = false,
    autoCapitalize = 'off'
}) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputLabel} htmlFor={name}>
                {label}
            </label>
            <Field
                required={required}
                type={type}
                name={name}
                className={styles.inputField}
                autoCapitalize={autoCapitalize}
            />
        </div>
    );
};

export default TextInput;
