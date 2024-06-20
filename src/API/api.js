import {useCallback} from 'react';

import settings from '../settings.json';

const useAPI = () => {
    const callAPI = useCallback((route, method, data) => {
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
                    const errorResponse = await response.clone().json();
                    reject(errorResponse.error);
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