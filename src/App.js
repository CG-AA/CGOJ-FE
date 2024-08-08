import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notification from './notification/Notification';
import Header from './pages/header/Header';
import { GlobalProvider } from './provider/golbalProvider';

import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Problems from './pages/problems/Problems';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/problems" element={<Problems />} />
        </Routes>
        <Notification />
      </Router>
    </GlobalProvider>
  );
}

export default App;
