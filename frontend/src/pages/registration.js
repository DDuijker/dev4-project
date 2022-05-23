import React from "react";
import {Link} from "react-router-dom";
import "../css/registration.css"

export default function Registration() {
    return (
        <div>
            <h1 className={"text-registration"}>Registreer</h1>
            <form className={"register"}>
                <div className={"input"}>
                    <label className={"label"}>E-mail: </label>
                    <input type={"email"} name={"email"} placeholder={"..."}/>
                </div>
                <div className={"input"}>
                    <label className={"label"}>Voornaam: </label>
                    <input type={"text"} name={"firstname"} placeholder={"..."}/>
                </div>
                <div className={"input"}>
                    <label className={"label"}>Tussenvoegsel: </label>
                    <input type={"text"} name={"infix"} placeholder={"..."}/>
                </div>
                <div className={"input"}>
                    <label className={"label"}>Achternaam: </label>
                    <input type={"text"} name={"lastname"} placeholder={"..."}/>
                </div>
                <div className={"input"}>
                    <label className={"label"}>Wachtwoord: </label>
                    <input type={"password"} name={"password"} placeholder={"..."}/>
                </div>
            </form>
            <div className={"buttons"}>
                <Link to="/login">
                    <button className={"register-button"}>Registreer</button>
                </Link>
            </div>
        </div>
    )
}
