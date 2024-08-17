/**
 * to BE:
 * POST /login { email: string, password: string }
 */

import React, { useState, useContext } from 'react';
import { notify_error, notify_warning, notify_success } from '../../notification/Notification';
import validator from 'validator';
import { useAPI } from '../../API/API';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../provider/golbalProvider';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserName } = useContext(GlobalContext);
    const navigate = useNavigate();
    const API = useAPI();
    if(localStorage.getItem('userName')) {
        navigate('/');
        return;
    }

    const HandleSubmit = async (event) => {
        event.preventDefault();
        // validate the form
        if (!validator.isEmail(email)) {
            notify_warning('Please enter a valid email address');
            return;
        }
        
        try {
            const response = await API('POST', '/login', { 'email': email, 'password': password });
            if (response.status === 200) {
                // store the token in local storage
                localStorage.setItem('jwt', response.data.JWT);
                setUserName(response.data.name);
                navigate(-1);
                notify_success('Login successful');
            } else {
                notify_error('Login failed');
            }
        } catch (error) {
            notify_error(error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={HandleSubmit}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;