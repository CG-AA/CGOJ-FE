import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
function Header() {
    const [authButton, setAuthButton] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if(storedUserName) {
            setAuthButton(
                <li className="nav-item" style={{ marginLeft: 'auto' }}>
                    <Link to="/profile" className="nav-link">
                        Welcome, {storedUserName}
                    </Link>
                    <button className='nav-button' onClick={() => {localStorage.clear(); window.location.reload();}}>Logout</button>
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