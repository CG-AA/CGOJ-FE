/**
 * To BE:
 * POST /register { name: string, email: string, password: string }
 */
import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { notify_error, notify_warning, notify_success } from '../../notification/Notification';
import validator from 'validator';
import { callAPI } from '../../API/API';
import { GlobalContext } from '../../provider/golbalProvider';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserName } = useContext(GlobalContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // validate the form
        if (!validator.isEmail(email)) {
            notify_warning('Please enter a valid email address');
            return;
        }
        try {
            const response = await callAPI('POST', '/register', { 'name': name, 'email': email, 'password': password });
            if (response.status === 200) {
                // store the token in local storage
                localStorage.setItem('jwt', response.data.JWT);
                setUserName(response.data.name);
                // redirect to home page
                Navigate('/');
                notify_success('Registration successful');
            }
        }
        catch (error) {
            notify_error(error.message);
        }
    }

    return (
        <div className="login-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;