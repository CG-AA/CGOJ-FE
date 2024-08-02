import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notification from './notification/Notification';
import Header from './pages/header/Header';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
      <Notification />
    </Router>
  );
}

export default App;
