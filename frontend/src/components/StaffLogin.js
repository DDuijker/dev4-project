import React from 'react';
import '../css/login.css';
import {login} from "../connect_backend";

export default function StaffLogin() {
    const [error, setError] = React.useState("");

    function handleSubmit(event) {
        //get the data
        event.preventDefault();
        let data = {
            email: event.target.emailm.value,
            password: event.target.passwordm.value,
        };
        //send the data to the backend
        login(data, setError, true);
    }


    return (
        <div>
            <h1 className={"text-login"}>Medewerker Login</h1>
            <form
                className={"login"}
                onSubmit={handleSubmit}
            >
                <div className={"input"}>
                    <label className={"label"}>E-mail: </label>
                    <input type={"email"} name={"emailm"} placeholder={"..."}/>
                </div>
                <div className={"input"}>
                    <label className={"label"}>Wachtwoord: </label>
                    <input type={"password"} name={"passwordm"} placeholder={"..."}/>
                </div>
                <div className={"error-text"}>{error}</div>
                <button type="submit" className={"login-button-staff"}>
                    Login
                </button>
            </form>
        </div>
    );
}