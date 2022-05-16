import React from "react";
import {Nav, NavLink, NavMenu}
    from "./NavbarElements";
import "../../css/Navbar.css"

const Navbar = () => {
    return (
        <>
            <Nav id={"navbar"}>
                <h1 id={"navbar--text"}>GitPub</h1>
                <NavMenu>
                    <NavLink to="/home">
                        Home
                    </NavLink>
                    <NavLink to="/gallery">
                        Gallery
                    </NavLink>
                    <NavLink to="/menu">
                        Menu
                    </NavLink>
                    <NavLink to="/reservation">
                        Reservation
                    </NavLink>
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;