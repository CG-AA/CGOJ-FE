import React from 'react';
import { Link } from 'react-router-dom';

import './PageHeader.css';

import LightDarkModeToggle from '../buttons/light-dark-mode-toggle';

const PageHeader = () => {
    return (
        <div className='page-header'>
        <Link to="/home">
            <button className="home-button">Home</button>
        </Link>
        <Link to="/problems">
            <button className="home-button">Problems</button>
        </Link>
        <Link to="/contests">
            <button className="home-button">Contests</button>
        </Link>
        <Link to="/login">
            <button className="home-button">Login</button>
        </Link>
        <Link to="/register">
            <button className="home-button">Register</button>
        </Link>
        <LightDarkModeToggle />
    </div>
    );
};

export default PageHeader;