import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [userName, setUserName] = useState('');

    return (
        <GlobalContext.Provider value={{ userName, setUserName }}>
            {children}
        </GlobalContext.Provider>
    );
}