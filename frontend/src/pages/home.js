import React from "react";
import "../css/home.css";
import {Link} from "react-router-dom";
import StaffData from "../components/staffData";

export default function Home() {
  return (
    <div>
      <div className={"banner"}>
        <h1 className={"banner--header"}>We love good food.</h1>
      </div>
      <Link className={"banner--button"} to="/menu">
        <button className={"btn-2"} type="button">
          Menu
        </button>
      </Link>
      <div className={"about-us"}>
        <h2 className={"about-us--header-text"}>Over ons:</h2>
        <p className={"about-us--text"}>
          Gelegen aan de herengracht in Amsterdam met prachtig uitzicht op de
          grachten. We zijn een apart eetcafe waar je ook nog kan gamen en
          coderen: nieuw en revolutionair. Geniet van heerlijk eten met een
          enorme keuze aan dranken U bent van harte welkom om te komen lunchen
          of dineren.
        </p>
          <h3>Dit zijn wij:</h3>
          <StaffData/>
      </div>
    </div>
  );
}
