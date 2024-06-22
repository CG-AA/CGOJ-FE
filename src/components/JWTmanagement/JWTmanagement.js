import React, { createContext, useContext, useEffect } from 'react';
import useAPI from '../../API/api';
import { NotificationContext } from '../notifications/NotificationList';

export const JWTContext = createContext();

export const JWTProvider = ({ children }) => {
    const { callAPI } = useAPI();
    const { addNotification } = useContext(NotificationContext);

    const validateJWT = async () => {
        try {
            await callAPI('/validate-jwt', 'GET');
        } catch (error) {
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem('jwt');
        addNotification(2, 'Session expired, please log in again');
        window.location.href = '/login';
    };

    useEffect(() => {
        validateJWT();
        // You might want to validate the JWT periodically
        // const intervalId = setInterval(validateJWT, 10000); // every 10 seconds

        // return () => clearInterval(intervalId);
    }, []);

    return (
        <JWTContext.Provider value={{ logout }}>
            {children}
        </JWTContext.Provider>
    );
};