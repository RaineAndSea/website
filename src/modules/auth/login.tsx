/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import { css } from '@emotion/css';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { BASE_QUERY } from '../../App';
import { setCookie } from '../../util/cookies/cookies';
import { MQ } from '../../util/mediaQueries';
import TextInput from './Input';

export const authToastMessages = {
    success: 'Login successful',
    error: 'Oops..',
    loading: 'Loading'
};
export const regLoginHyperlink = css`
    font-size: 0.9em;
    margin-top: 5%;

    .decorated {
        padding: 3px;
        color: rgb(24, 119, 242);
        text-decoration: underline;
        font-weight: bold;
        &:hover {
            cursor: pointer;
            color: rgb(24, 99, 222);
            background-color: rgb(245, 245, 245);
        }
    }
`;

export const regLoginSubmitButton = css`
    width: 80%;
    padding: 3% 0;
    background-image: linear-gradient(to bottom right, #adf4f9, #fef1fe);
    border: none;
    color: #333333;
    font-weight: bold;
    font-size: 1em;
    border-radius: 5px;
    transition: all 300ms ease; /* Transition for smooth effect */

    &:hover {
        cursor: pointer;
        filter: brightness(1.02);
    }
`;
const base = css`
    display: flex;
    width: 100%;
    height: 78.7%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${MQ.mobile} {
        height: 80%;
    }
`;
const loginForm = css`
    border-radius: 12px;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3% 0 2% 0;
    align-items: center;
    background-color: white;
    box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.1),
        0 8px 16px rgba(0, 0, 0, 0.1);

    ${MQ.mobile} {
        width: 100%;
        padding: 10% 0 9% 0;
    }
`;

export const errorMessageStyle = css`
    color: #a31b12;
    width: 100%;
    background-color: #ffefee;
    padding: 10px 0;
    width: 80%;
    border: 1px solid #a31b12;
`;

type LoginBody = {
    email: string;
    password: string;
};
export const Login: FC<{ isRegistering: boolean; setIsRegistering: (isRegistering: boolean) => void }> = ({
    isRegistering,
    setIsRegistering
}) => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleSubmit = (vals: LoginBody) => {
        const { email, password } = vals;

        const promise = axios.post(`${BASE_QUERY}/users/login`, {
            email,
            password
        });

        toast
            .promise(promise, authToastMessages)
            .then(res => {
                setCookie('csrfToken', res.data.token);
                window.location.replace('/');
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    setErrorMessage(err.response.data.errorMessage);
                    return;
                }

                setErrorMessage('An unexpected error occured');
            });
    };

    return (
        <div className={base}>
            <Formik initialValues={{ email: '', password: '' }} onSubmit={(vals: LoginBody) => handleSubmit(vals)}>
                {props => (
                    <Form className={loginForm}>
                        {errorMessage && <p className={errorMessageStyle}>{errorMessage}</p>}
                        <TextInput required label='Email' name='email' />
                        <TextInput required label='Password' name='password' type='password' />
                        <button className={regLoginSubmitButton} type='submit'>
                            Login
                        </button>
                        <p className={regLoginHyperlink} onClick={() => setIsRegistering(!isRegistering)}>
                            Need an account? <span className='decorated'>Register here</span>
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
