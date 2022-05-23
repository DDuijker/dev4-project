import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Route, Routes}
    from 'react-router-dom';
import Home from './pages/home';
import Gallery from './pages/gallery';
import Menu from './pages/menu';
import Reservation from './pages/reservation';
import Login from './pages/login'
import Footer from "./components/Footer";

function App() {
    return (
        <div className={"wrapper"}>
            <Router>
                <div className={"page-header"}><Navbar/></div>
                <div className={"page-body"}>
                    <Routes>
                        <Route path='/' exact element={<Home/>}/>
                        <Route path='/home' exact element={<Home/>}/>
                        <Route path='/gallery' element={<Gallery/>}/>
                        <Route path='/menu' element={<Menu/>}/>
                        <Route path='/reservation' element={<Reservation/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </div>
            </Router>
            <div className={"page-footer"}><Footer/></div>
        </div>
    );
}

export default App;