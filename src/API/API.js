import axios from 'axios';
import { notify_error } from '../notification/Notification';

const url = process.env.REACT_APP_BE_URL;

async function callAPI(method, endpoint, data) {
    const fullUrl = `${url}${endpoint}`;
    const jwt = localStorage.getItem('jwt') || '0';

    const headers = {
        'Authorization': `${jwt}`
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        headers['Content-Type'] = 'application/json';
    }

    try {
        const response = await axios({
            method: method,
            url: fullUrl,
            data: data,
            headers: headers
        });
        return response;
    } catch (error) {
        notify_error(error.response?.data?.message || 'An error occurred');
        throw error;
    }
}

export { callAPI };