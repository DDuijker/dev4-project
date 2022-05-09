import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages/home';
import Gallery from './pages/gallery';
import Menu from './pages/menu';
import Reservation from './pages/reservation';


function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route exact path='/' exact element={<Home/>}/>
                <Route exact path='/home' exact element={<Home/>}/>
                <Route path='/gallery' element={<Gallery/>}/>
                <Route path='/menu' element={<Menu/>}/>
                <Route path='/reservation' element={<Reservation/>}/>
            </Routes>
        </Router>
    );
}

export default App;