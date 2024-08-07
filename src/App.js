import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notification from './notification/Notification';
import Header from './pages/header/Header';

import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Notification />
    </Router>
  );
}

export default App;
