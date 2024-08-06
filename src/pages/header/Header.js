import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    const [userName, setUserName] = useState('');
    const [authButton, setAuthButton] = useState('');

    useEffect(() => {
        const updateUserName = () => {
            const storedUserName = localStorage.getItem('userName');
            setUserName(storedUserName || '');
        };

        updateUserName();

        window.addEventListener('storage', updateUserName);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('storage', updateUserName);
        };
    }, []);

    useEffect(() => {
        if (userName) {
            setAuthButton(
                <li className="nav-item" style={{ marginLeft: 'auto' }}>
                    <Link to="/profile" className="nav-link">
                        Welcome, {userName}
                    </Link>
                </li>
            );
        } else {
            setAuthButton(
                <li className="nav-item" style={{ marginLeft: 'auto' }}>
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>
            );
        }
    }, [userName]);

    return (
        <header className="header">
            <nav>
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    {authButton}
                </ul>
            </nav>
        </header>
    );
}

export default Header;