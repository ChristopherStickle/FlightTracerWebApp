import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home.js';
import About from './pages/about.js';
import Map from './pages/map.js';
function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/map" element={<Map/>} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </>
    )
}

export default App;
