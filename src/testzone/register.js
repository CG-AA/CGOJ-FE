import React, { useState } from 'react';
import axios from 'axios';
import settings from '../settings.json';
function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [response, setResponse] = useState('');

    const register = async (event) => {
        event.preventDefault();
        try {
            console.log(settings.CGBE_origin+'/register');
            const response = await axios.post(settings.CGBE_origin+'/register', { username, email, password });
            setIsSubmitted(true); // Set isSubmitted to true after the form is submitted
            setResponse(response.data);

            localStorage.setItem('jwt', response.data);

            return (response.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (isSubmitted) {
        return (<div><p>Thank you for registering!</p><br /><p>{response}</p></div>);
    } else {
        return (
            <form onSubmit={register}>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        );
    }
}

export default RegistrationForm;