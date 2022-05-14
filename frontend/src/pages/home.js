import React from "react";
import "../css/home.css"

export default function Home() {
    return (
        <div>
            <div className={"banner"}>
                <h1 className={"banner--header"}>We love good food.</h1>
            </div>
            <div className={"about-us"}>
                <h3 className={"about-us--header-text"}>Over ons:</h3>
                <p className={"about-us--text"}>Gelegen aan de herengracht in Amsterdam
                    met prachtig uitzicht op de grachten.
                    We zijn een apart eetcafe waar je ook nog kan gamen en coderen:
                    nieuw en revolutionair.
                    Geniet van heerlijk eten met een enorme keuze aan dranken
                    U bent van harte welkom om te komen lunchen of dineren.</p>
            </div>
        </div>
    )
}

