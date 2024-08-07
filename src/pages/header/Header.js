import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

// Override localStorage.setItem to dispatch a custom event
const originalSetItem = localStorage.setItem;

localStorage.setItem = function(key, value) {
    const event = new Event('itemInserted');
    document.dispatchEvent(event);
    originalSetItem.apply(this, arguments);
};

function Header() {
    const [authButton, setAuthButton] = useState('');

    useEffect(() => {
        const updateUserName = () => {
            const storedUserName = localStorage.getItem('userName');
            if(storedUserName) {
                setAuthButton(
                    <li className="nav-item" style={{ marginLeft: 'auto' }}>
                        <Link to="/profile" className="nav-link">
                            Welcome, {storedUserName}
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
        };

        updateUserName();

        // Listen for custom 'itemInserted' event
        document.addEventListener('itemInserted', updateUserName);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('itemInserted', updateUserName);
        };
    }, []);

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