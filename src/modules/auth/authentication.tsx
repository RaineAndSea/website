import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../../util/cookies/cookies';
import { Login } from './login';
import { Register } from './register';

export const verifyCsrfToken = async () => {
    const csrfToken = getCookie('csrfToken');
    if (!csrfToken) {
        return false;
    }

    try {
        const decoded = jwtDecode(csrfToken);
        if (!decoded || !decoded.exp || decoded.exp * 1000 < Date.now()) {
            return false;
        }

        return true;
    } catch (_error) {
        return false;
    }
};
export const Authentication = () => {
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);

    useEffect(() => {
        const validateToken = async () => {
            if (!(await verifyCsrfToken())) {
                removeCookie('csrfToken');
            } else {
                navigate('/');
            }
        };

        validateToken();
    }, []);

    return isRegistering ? (
        <Register isRegistering={isRegistering} setIsRegistering={setIsRegistering} />
    ) : (
        <Login isRegistering={isRegistering} setIsRegistering={setIsRegistering} />
    );
};
