import React from "react";
import {Nav, NavLink, NavMenu}
    from "./NavbarElements";
import "../../css/Navbar.css"
import {logout} from "../../connect_backend";


const Navbar = ({medewerker, loggedIn}) => {
    if (medewerker === false) {
        return (
            <>
                <Nav id={"navbar"}>
                    <h1 id={"navbar--text"}>GitPub</h1>
                    <NavMenu>
                        <NavLink className={"btn-2"} to="/home">
                            Home
                        </NavLink>
                        <NavLink className={"btn-2"} to="/gallery">
                            Gallerij
                        </NavLink>
                        <NavLink className={"btn-2"} to="/menu">
                            Menu
                        </NavLink>
                        <NavLink className={"btn-2"} to="/reservation">
                            Reserveer
                        </NavLink>
                        {//if you're not logged in you get a /login
                        }
                        {loggedIn === false ?
                            (<NavLink className={"btn-2"} to="/login">
                                Login
                            </NavLink>)
                            : (<>
                                <NavLink className={"btn-2"} to="/myreservations">
                                    Mijn reserveringen
                                </NavLink>
                                <button className={"btn-2"} onClick={() => {
                                    logout()
                                    window.location.reload()
                                }}>Logout
                                </button>
                            </>)}
                    </NavMenu>
                </Nav>
            </>
        );
    } else {
        return (
            <>
                <Nav id={"navbar"}>
                    <h1 id={"navbar--text"}>GitPub</h1>
                    <NavMenu>
                        <NavLink className={"btn-2"} to="/allReservations">
                            Reserveringen
                        </NavLink>
                        <NavLink className={"btn-2"} to="/tables">
                            Tafels
                        </NavLink>
                        <button className={"btn-2"} onClick={() => {
                            logout()
                            window.location.reload()
                        }}>Logout
                        </button>
                    </NavMenu>
                </Nav>
            </>
        );
    }

};

export default Navbar;