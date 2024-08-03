import React, { useState } from 'react';
import { notify } from '../../notification/Notification';
import validater from 'validator';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // validate the form
        if (!username || !password) {
            notify
            return;
        }
        if (!validater.isEmail(username)) {
            alert('Please enter a valid email');
            return;
        }
    };

    return (
        <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <button type="submit">Login</button>
        </form>
        </div>
    );
}

export default Login;