import React from "react";
import {Link} from "react-router-dom";
import "../css/registration.css";
import {register} from '../connect_backend'

export default function Registration() {

    function handleSubmit(event) {
        //get the data
        event.preventDefault()
        let data = {
            email: event.target.email2.value,
            firstname: event.target.firstname.value,
            infix: event.target.infix.value,
            lastname: event.target.lastname.value,
            password: event.target.password2.value,
            confirmpassword: event.target.confirmpassword.value
        }
        console.log(data)
        register(data)
    }

    return (
        <div>
            <h1 className={"text-registration"}>Registreer</h1>
            <form className={"register"} onSubmit={handleSubmit}>
                <div className={"input"}>
                    <label className={"label"}>E-mail: </label>
                    <input type={"email"} name={"email2"} placeholder={"..."}/>
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
                    <input type={"password"} name={"password2"} placeholder={"..."}/>
                </div>
                <div className={"input"}>
                    <label className={"label"}>Wachtwoord: </label>
                    <input type={"password"} name={"confirmpassword"} placeholder={"..."}/>
                </div>
                <div className={"buttons"}>
                    <button className={"register-button"}>Registreer</button>
                </div>
            </form>

        </div>
    )
}
