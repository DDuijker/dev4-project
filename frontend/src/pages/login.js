import React from "react";
import {Link} from "react-router-dom";
import "../css/login.css";
import {login} from "../connect_backend";

export default function Login() {
    const [error, setError] = React.useState("");

    function handleSubmit(event) {
        //get the data
        event.preventDefault();
        let data = {
            email: event.target.email.value,
            password: event.target.password.value,
        };
        //send the data to the backend
        login(data, setError, false);
    }

    function handleStaffMember(event) {
        //redirect to the staff login page
        event.preventDefault();
        window.location.href = "/staff_login";
    }

    return (
        <div>
            <h1 className={"text-login"}>Login</h1>
            <form
                className={"login"}
                onSubmit={handleSubmit}
            >
                <div className={"input"}>
                    <label className={"label"}>E-mail: </label>
                    <input type={"email"} name={"email"} placeholder={"..."}/>
                </div>
                <div className={"input"}>
                    <label className={"label"}>Wachtwoord: </label>
                    <input type={"password"} name={"password"} placeholder={"..."}/>
                </div>
                <div className={"error-text"}>{error}</div>
                <button type="submit" className={"login-button"}>
                    Login
                </button>
            </form>

            <div className={"buttons"}>
                <Link to="/registration">
                    <button className={"no-account"}>Nog geen account?</button>
                </Link>

                <button className={"medewerkerbutton"} onClick={handleStaffMember}>Ik ben een medewerker</button>

            </div>
        </div>
    );
}
