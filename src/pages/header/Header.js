import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { GlobalContext } from '../../provider/golbalProvider';
function Header() {
    const [authButton, setAuthButton] = useState('');
    const { userName, setUserName } = useContext(GlobalContext);

    useEffect(() => {
        if(userName) {
            console.log('name');
            setAuthButton(
                <li className="nav-item" style={{ marginLeft: 'auto' }}>
                    <Link to="/profile" className="nav-link">
                        Welcome, {userName}
                    </Link>
                    <button className='nav-button' onClick={() => {localStorage.clear(); window.location.reload();}}>Logout</button>
                </li>
            );
        } else {
            console.log('no name');
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