import React, { useState } from 'react';
import axios from 'axios';
import settings from '../settings.json';

function Testjwt() {
    const [response, setResponse] = useState('');

    const test = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(settings.CGBE_origin+'/testjwt', {}, { 
                headers: { 
                    Authorization: 'Bearer ' + localStorage.getItem('jwt') 
                } 
            });
            setResponse(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={test}>
            <button type="submit">Test</button>
            <p>{response}</p>
        </form>
    );
}

export default Testjwt;