import React from "react";
import {Nav, NavLink, NavMenu}
    from "./NavbarElements";
import "../../css/Navbar.css"

//TODO: if you're logged in the navbar login changes to logout
//TODO: make logout component/function
//TODO: if you're logged in there is another tab with "mijn reserveringen"
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
                                <NavLink className={"btn-2"} to="/logout">
                                    Logout
                                </NavLink>
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
                        <NavLink className={"btn-2"} to="/reservations">
                            Reserveringen
                        </NavLink>
                        <NavLink className={"btn-2"} to="/tables">
                            Tafels
                        </NavLink>
                        <NavLink className={"btn-2"} to="/logout">
                            Logout
                        </NavLink>
                    </NavMenu>
                </Nav>
            </>
        );
    }

};

export default Navbar;