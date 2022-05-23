import React from "react";
import {Link} from "react-router-dom";
import '../css/login.css'

export default function Login() {
    return (
        <div>
            <h1 className={"text-login"}>Login</h1>
            <form className={"login"}>
                <div className={"input"}>
                    <label className={"label"}>E-mail: </label>
                    <input type={"email"} name={"email"} placeholder={"..."}/>
                </div>
                <div className={"input"}>
                    <label className={"label"}>Wachtwoord: </label>
                    <input type={"password"} name={"password"} placeholder={"..."}/>
                </div>
            </form>
            <div className={"buttons"}>
                <button className={"login-button"}>Login</button>
                <Link to="/registration">
                    <button className={"no-account"}>Nog geen account?</button>
                </Link>
            </div>
        </div>
    )
}


