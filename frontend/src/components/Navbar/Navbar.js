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
                    <NavLink className={"btn-2"} to="/home">
                        Home
                    </NavLink>
                    <NavLink className={"btn-2"} to="/gallery">
                        Gallery
                    </NavLink>
                    <NavLink className={"btn-2"} to="/menu">
                        Menu
                    </NavLink>
                    <NavLink className={"btn-2"} to="/reservation">
                        Reservation
                    </NavLink>
                    <NavLink className={"btn-2"} to="/login">
                        Login
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;