/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import { css } from "@emotion/css";
import axios from "axios";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { BASE_QUERY } from "../../App";
import { setCookie } from "../../util/cookies/cookies";
import { MQ } from "../../util/mediaQueries";
import TextInput from "./Input";
import { authToastMessages, errorMessageStyle, regLoginHyperlink, regLoginSubmitButton } from "./login";


const base = css`
    display: flex;
    width: 100%;
    height: 78.7%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${MQ.mobile} {
        height: 70%;
    }
`
const registerForm = css`
    border-radius: 12px;
    width: 30%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3% 0 2% 0;
    align-items: center;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);

    ${MQ.mobile} {
        width: 90%;
        padding: 10% 0 9% 0;
        top: 130px;
    }
`

type RegisterBody = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export const Register: FC<{isRegistering: boolean, setIsRegistering: (isRegistering: boolean) => void}> = ({isRegistering, setIsRegistering}) => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const navigate = useNavigate();
    
    const handleSubmit = (vals: RegisterBody) => {
        
        const { email, password, firstName, lastName } = vals;
        
        const promise = axios.post(`${BASE_QUERY}/users/register`, {
            email, password, firstName, lastName
        });
        
        toast.promise(promise, {...authToastMessages, success: 'Registration successful'})
        .then(res => {
            setCookie('logged-user', JSON.stringify(res.data.user))
            navigate('/')
        })
        .catch(err => {
            if(err.response && err.response.data) {
                setErrorMessage(err.response.data.errorMessage);
                return;
            }
            setErrorMessage('An unexpected error occured');
        })
    }

    return(
        <div className={base}>
            <Formik initialValues={{email: '', password: '', firstName: '', lastName: ''}} onSubmit={(vals: RegisterBody) => handleSubmit(vals)}>
                {(props) => (
                    <Form className={registerForm}>
                        {errorMessage && <p className={errorMessageStyle}>{errorMessage}</p>}
                        <TextInput required label="First Name" name="firstName" />
                        <TextInput required label="Last Name" name="lastName"/>
                        <TextInput required label="Email" name="email" />
                        <TextInput required label="Password" name="password" type="password"/>
                        <button className={regLoginSubmitButton} type="submit" style={{background: 'linear-gradient(to bottom right, #9ce8ae, #f0ffe7)'}}>Register</button>
                        <p className={regLoginHyperlink} onClick={() => setIsRegistering(!isRegistering)}>Already registered? <span className="decorated">Login here</span></p>
                    </Form>
                )}
            </Formik>
        </div>
    )
}