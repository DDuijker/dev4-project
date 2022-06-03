import React from "react";
import {Link} from "react-router-dom";
import "../css/login.css";
import {login} from "../connect_backend";

export default function Login() {
  function handleSubmit(event) {
    //get the data
    event.preventDefault();
    let data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    console.log(data);
    login(data);
  }

  return (
      <div>
        <h1 className={"text-login"}>Login</h1>
        <form
            action="http://localhost:5000/login"
            method="post"
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
          <button type="submit" className={"login-button"}>
            Login
          </button>
        </form>
        <div className={"buttons"}>
          <Link to="/registration">
              <button className={"no-account"}>Nog geen account?</button>
          </Link>
            <button className={"medewerkerbutton"}>Ik ben een medewerker</button>
        </div>
      </div>
  );
}
