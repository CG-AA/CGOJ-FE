import React, { useState } from 'react';
import axios from 'axios';
import settings from '../settings.json';

function TestCORS() {
    const [response, setResponse] = useState('');

    const test = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(settings.CGBE_origin+'/testCORS');
            setResponse(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={test}>Test</button>
            <p>{response}</p>
        </div>
    );
}

export default TestCORS;