import React from 'react';
import './Home.css';

import News from '../news/News';

const Home = () => {

    return (
        <div className="home-container">
            <div className='home-body'>
                <News />
            </div>
        </div>
    );
};

export default Home;