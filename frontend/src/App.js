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
import Registration from "./pages/registration";
import Tables from "./pages/tables";
import Reservations from "./pages/reservations";
import {logout} from './connect_backend'

function App() {
    //TODO: als je inlogt als medewerker, zet medewerker === true.
    //TODO: maak pagina's voor de medewerkers: tafels, reserveringen
    const [userLogged, setUserLogged] = React.useState(false)
    const [medewerkerIngelogd, setMedewerkerIngelogd] = React.useState(false)

    function setIngelogd(boolean) {
        setUserLogged(boolean)
    }

    return (
        <div className={"wrapper"}>
            <Router>
                <div className={"page-header"}>
                    <Navbar medewerker={medewerkerIngelogd} loggedIn={userLogged}/>
                </div>
                <div className={"page-body"}>
                    <Routes>
                        <Route path='/' exact element={<Home/>}/>
                        <Route path='/home' exact element={<Home/>}/>
                        <Route path='/gallery' element={<Gallery/>}/>
                        <Route path='/menu' element={<Menu/>}/>
                        {//geef mee of de gebruiker is ingelogd, anders mag ie geen reservatie maken
                        }
                        <Route path='/reservation' element={<Reservation loggedIn={userLogged}/>}/>
                        <Route path='/login' element={<Login setLogin={setIngelogd}/>}/>
                        <Route path='/registration' element={<Registration/>}/>
                        <Route path='/myReservations' element={<Reservations/>}/>
                        <Route path='/tables' element={<Tables/>}/>
                        <Route path='/logout' element={logout}/>
                    </Routes>
                </div>
            </Router>
            <div className={"page-footer"}><Footer/></div>
        </div>
    );
}

export default App;