import React, { useState, useCallback } from 'react';
import settings from '../../settings.json';

const SubmitCode = () => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (event) => {
        if (code === '' || language === '') {
            setResponse('Code or language is missing.');
            return;
        }

        event.preventDefault();

        try {
            const res = await fetch(settings.CGBE_origin+'/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ language, code }),
            });

            if (res.ok) {
                setResponse('Submit successful');
            } else {
                setResponse('Failed to submit code');
            }
        } catch (error) {
            setResponse('Failed to submit code');
        }
    };

    const setLanguageValue = useCallback((value) => {
        setLanguage(value);
    }, []);

    const setCodeValue = useCallback((value) => {
        setCode(value);
    }, []);

    return { setLanguageValue, setCodeValue, SubmitButton: <button onClick={handleSubmit}>Submit Code</button>, response };
};

export default SubmitCode;