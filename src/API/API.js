import axios from 'axios';
import { notify_error } from '../notification/Notification';

const url = process.env.REACT_APP_BE_URL;

// todo
// remove data and content-type if the method does not require them
async function callAPI(method, endpoint, data) {
    const fullUrl = `${url}${endpoint}`;

    try {
        const response = await axios({
            method: method,
            url: fullUrl,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('jwt')}`
            }
        });
        return response.data;
    } catch (error) {
        notify_error(error.response?.data?.message || 'An error occurred');
        throw error;
    }
}

export { callAPI };