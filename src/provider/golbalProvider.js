import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

const useLocalStorageState = (key, initialValue) => {
    const [state, setState] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
};

export const GlobalProvider = ({ children }) => {
    const [userName, setUserName] = useLocalStorageState('userName', '');

    return (
        <GlobalContext.Provider value={{ userName, setUserName }}>
            {children}
        </GlobalContext.Provider>
    );
};