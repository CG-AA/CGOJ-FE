import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    const [userName, setUserName] = useState('');
    const [authButton, setAuthButton] = useState('');

    useEffect(() => {
        const storedUserName = localStorage.getItem('UserName');
        if (storedUserName) {
            setUserName(storedUserName);
        }

        const handleStorageChange = () => {
            const updatedUserName = localStorage.getItem('UserName');
            setUserName(updatedUserName || '');
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
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