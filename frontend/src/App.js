import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Gallery from "./pages/gallery";
import Menu from "./pages/menu";
import Reservation from "./pages/reservation";
import Login from "./pages/login";
import Footer from "./components/Footer";
import Registration from "./pages/registration";
import Tables from "./pages/tables";
import Reservations from "./pages/reservations";
import { getCookie, logout } from "./connect_backend";
import StaffLogin from "./components/StaffLogin";
import AllReservations from "./pages/allReservations";

function App() {
  const loggedIn = getCookie("token") != null;
  const medewerker = getCookie("staff_token") != null;

  return (
    <div className={"wrapper"}>
      <Router>
        <div className={"page-header"}>
          <Navbar medewerker={medewerker} loggedIn={loggedIn} />
        </div>
        <div className={"page-body"}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/home" exact element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/menu" element={<Menu />} />
            <Route
              path="/reservation"
              element={<Reservation loggedIn={loggedIn} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/myReservations" element={<Reservations />} />
            <Route
              path="/allReservations"
              element={
                <AllReservations medewerker={medewerker} loggedIn={loggedIn} />
              }
            />
            <Route
              path="/tables"
              element={<Tables medewerker={medewerker} loggedIn={loggedIn} />}
            />
            <Route path="/staff_login" element={<StaffLogin />} />
            <Route path="/logout" element={logout} />
          </Routes>
        </div>
      </Router>
      <div className={"page-footer"}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
