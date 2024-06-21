import {useCallback, useContext} from 'react';

import settings from '../settings.json';
import { NotificationContext } from '../components/notifications/NotificationList';
import obtainJWT from '../functions/obtainJWT';

/**
 * Custom hook for making API calls.
 * @returns {Object} An object containing the `callAPI` function.
 */
const useAPI = () => {
    const callAPI = useCallback((route, method, data) => {
        const { addNotification } = useContext(NotificationContext);
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    method,
                    headers: {
                        'Authorization': localStorage.getItem('jwt'),
                        'Content-Type': 'application/json'
                    }
                };
    
                if (method.toUpperCase() !== 'GET') {
                    options.body = JSON.stringify(data);
                }
    
                const response = await fetch(settings.CGBE_origin+route, options);
    
                if (!response.ok) {
                    const error = await response.text();
                    if (error.startsWith("Failed to verify JWT:")){
                        if(localStorage.getItem('jwt')){
                            localStorage.removeItem('jwt');
                            addNotification(2, 'Session expired, please log in again');
                        }else {
                            await obtainJWT();
                        }

                    }
                    reject(error);
                }
    
                const responseData = await response.json();
                resolve(responseData);
            } catch (error) {
                reject(error);
            }
        });
    }, []);

    return { callAPI };
};

export default useAPI;