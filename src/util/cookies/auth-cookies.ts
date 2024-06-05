// cookieUtils.js

import { jwtDecode } from 'jwt-decode';
import { cookies, getCookie, removeCookie } from './cookies';

interface User {
    firstName: string;
    lastName: string;
    email: string;
}

export const decodeUser = () => {
    const user = cookies.get('logged-user');
    if (!user) {
        return;
    }
    return user as User;
};

export const logout = () => {
    removeCookie('csrfToken');
};

interface DecodedToken {
    email: string;
    firstName: string;
    iat: number;
    exp: number;
}
export const decodeToken = () => {
    const token = getCookie('csrfToken');
    
    try {
        return jwtDecode(token) as DecodedToken;
    } catch {
        return {} as DecodedToken;
    }
    
}