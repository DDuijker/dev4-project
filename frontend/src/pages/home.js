import React from "react";
import "../css/home.css";
import { Link, Route, Routes, useHistory } from "react-router-dom";
import MedewerkerData from "../components/medewerkerData";

export default function Home() {
  function changeRouter() {
    return <Link to={"http://localhost:3000/menu"} />;
  }

  return (
    <div>
      <div className={"banner"}>
        <h1 className={"banner--header"}>We love good food.</h1>
        <Link className={"banner--button"} to="/menu">
          Go see our menu
        </Link>
      </div>
      <div className={"about-us"}>
        <h2 className={"about-us--header-text"}>Over ons:</h2>
        <p className={"about-us--text"}>
          Gelegen aan de herengracht in Amsterdam met prachtig uitzicht op de
          grachten. We zijn een apart eetcafe waar je ook nog kan gamen en
          coderen: nieuw en revolutionair. Geniet van heerlijk eten met een
          enorme keuze aan dranken U bent van harte welkom om te komen lunchen
          of dineren.
        </p>
        <h3>Medewerkers:</h3>
        <MedewerkerData />
        <h2 className={"adress"}>
          Adres: Marktplein 2, Amsterdam, Netherlands
        </h2>
      </div>
    </div>
  );
}
