import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/home/Home';
import Problems from './pages/problems/Problems';
import Login from './pages/login/Login';
import NotFound from './pages/notfound/NotFound';
import RegisterForm from './pages/register/Register';
import Manage_panel from './pages/manage_panel/manage_panel';
import PageHeader from './components/pageheader/PageHeader';

function App() {
    return (
        <Router>
            <PageHeader />
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace/>} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<Login />} />
                <Route path='/problems' element={<Problems />} />
                <Route path="/problem/:id" element={<Problems />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;