import axios from 'axios';
import { getCookie } from './cookies/cookies';

export const secureAxios = axios.create({
    timeout: 5000, // Adjust timeout as needed
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('csrfToken')}`
    }
});
