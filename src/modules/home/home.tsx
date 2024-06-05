import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { cookies } from '../../util/cookies/cookies';

export const Home = () => {
    useEffect(() => {
        const token = cookies.get('csrfToken');

        if (!token) {
            return;
        }
        console.log(token);
        console.log(jwtDecode(token));
    }, []);

    return <>hello</>;
};
