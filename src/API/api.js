import { useCallback, useContext } from 'react';

import settings from '../settings.json';
import { NotificationContext } from '../components/notifications/NotificationList';

const useAPI = () => {
    const { addNotification } = useContext(NotificationContext);

    const callAPI = useCallback(async (route, method, data) => {
        try {
            const jwt = localStorage.getItem('jwt');

            const options = {
                method,
                headers: {
                    'Authorization': jwt,
                    'Content-Type': 'application/json'
                }
            };

            if (method.toUpperCase() !== 'GET') {
                options.body = JSON.stringify(data);
            }

            const response = await fetch(settings.CGBE_origin + route, options);

            if (!response.ok) {
                const error = await response.text();
                if (error.startsWith("Failed to verify JWT:")) {
                    localStorage.removeItem('jwt');
                    addNotification(2, 'Session expired, please log in again');
                }
                throw new Error(error);
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }, [addNotification]);

    return { callAPI };
};

export default useAPI;