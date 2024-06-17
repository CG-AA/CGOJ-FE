import React, { useState, useContext } from 'react';
import useAPI from '../../API/api';
import { NotificationContext } from '../../components/notifications/NotificationList';

import './Register.css';

const RegisterForm = () => {
    const { addNotification } = useContext(NotificationContext);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');

    const { callAPI } = useAPI();

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password !== confirm_password) {
            addNotification(1, 'Passwords do not match');
            return;
        }
        if (!username || !email || !password) {
            addNotification(1, 'Please fill out all fields');
            return;
        }

        try {
            const response = await callAPI('/register', 'POST', { username, email, password });
            localStorage.setItem('jwt', response.jwt);
            addNotification(0, 'Account created successfully');
        } catch (error) {
            addNotification(1, 'error: ' + error);
            return;
        }


    };

    return (
        <>
            <form onSubmit={handleRegister} className="register-form">
                <input type="name" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                <input type="password" value={confirm_password} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                <button type="submit">Register</button>
            </form>
        </>
    );
}

export default RegisterForm;