import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../../util/cookies/cookies';
import { Login } from './login';
import { Register } from './register';

export const Authentication = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    if (getCookie('logged-user')) {
        return <Navigate replace to={'/'} />;
    }

    return isRegistering ? (
        <Register isRegistering={isRegistering} setIsRegistering={setIsRegistering} />
    ) : (
        <Login isRegistering={isRegistering} setIsRegistering={setIsRegistering} />
    );
};
