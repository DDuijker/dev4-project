import React from "react";
import {Link} from "react-router-dom";
import "../css/registration.css";
import {register} from '../connect_backend'

export default function Registration() {

    return (
        <div>
            <h1 className={"text-registration"}>Registreer</h1>
            <form className={"register"}>
                <div className={"input"}>
                    <label className={"label"}>E-mail: </label>
                    <input type={"email"} id={"email2"} placeholder={"..."}/>
                </div>
                <div className={"input"}>
                    <label className={"label"}>Voornaam: </label>
                    <input type={"text"} id={"firstname"} placeholder={"..."}/>
                </div>
                <div className={"input"}>
                    <label className={"label"}>Tussenvoegsel: </label>
                    <input type={"text"} id={"infix"} placeholder={"..."}/>
                </div>
                <div className={"input"}>
                    <label className={"label"}>Achternaam: </label>
                    <input type={"text"} id={"lastname"} placeholder={"..."}/>
                </div>
                <div className={"input"}>
                    <label className={"label"}>Wachtwoord: </label>
                    <input type={"password"} id={"password2"} placeholder={"..."}/>
                </div>
            </form>
            <div className={"buttons"}>
                <button className={"register-button"} onClick={register}>Registreer</button>
            </div>
        </div>
    )
}
