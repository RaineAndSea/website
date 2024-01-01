// cookieUtils.js

import { cookies, removeCookie } from "./cookies";

interface User {
    firstName: string;
    lastName: string;
    email: string;
}

export const decodeUser = () => {
    const user = cookies.get('logged-user');
    console.log('user', user)
    if(!user) {
        return;
    }
    return user as User
}

export const logout = () => {
    removeCookie('logged-user');
}