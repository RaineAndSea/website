/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import { css } from '@emotion/css';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { FC, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { BASE_QUERY } from '../../App';
import { setCookie } from '../../util/cookies/cookies';
import { MQ } from '../../util/mediaQueries';
import TextInput from './Input';
import { authToastMessages, errorMessageStyle, regLoginHyperlink } from './login';

const base = css`
    display: flex;
    width: 100%;
    height: 78.7%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${MQ.mobile} {
        margin-top: 2vh;
        height: 100%;
    }

    ${MQ.smallMobile} {
        margin-top: 12vh;
    }
`;

const registerForm = css`
    border-radius: 12px;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3% 0 2% 0;
    align-items: center;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);

    ${MQ.mobile} {
        width: 100%;
        padding: 10% 0 9% 0;
    }
`;

const registerButton = css`
    width: 80%;
    padding: 3% 0;
    background: linear-gradient(to bottom right, #9ce8ae, #f0ffe7);
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

type RegisterBody = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export const Register: FC<{ isRegistering: boolean; setIsRegistering: (isRegistering: boolean) => void }> = ({
    isRegistering,
    setIsRegistering
}) => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleSubmit = useCallback((vals: RegisterBody) => {
        const { email, password, firstName, lastName } = vals;

        const promise = axios.post(`${BASE_QUERY}/users/register`, {
            email,
            password,
            firstName,
            lastName
        });

        toast
            .promise(promise, { ...authToastMessages, success: 'Registration successful' })
            .then(res => {
                setCookie('csrfToken', res.data.token);
                window.location.replace('/');
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    setErrorMessage(err.response.data.errorMessage);
                    return;
                }
                setErrorMessage('An unexpected error occurred');
            });
    }, []);

    const toggleRegistering = useCallback(() => {
        setIsRegistering(!isRegistering);
    }, [isRegistering, setIsRegistering]);

    return (
        <div className={base}>
            <Formik
                initialValues={{ email: '', password: '', firstName: '', lastName: '' }}
                onSubmit={(vals: RegisterBody) => handleSubmit(vals)}
            >
                {props => (
                    <Form className={registerForm}>
                        {errorMessage && <p className={errorMessageStyle}>{errorMessage}</p>}
                        <TextInput required label='First Name' name='firstName' />
                        <TextInput required label='Last Name' name='lastName' />
                        <TextInput required label='Email' name='email' />
                        <TextInput required label='Password' name='password' type='password' />
                        <button className={registerButton} type='submit'>
                            Register
                        </button>
                        <p className={regLoginHyperlink} onClick={toggleRegistering}>
                            Already registered? <span className='decorated'>Login here</span>
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
