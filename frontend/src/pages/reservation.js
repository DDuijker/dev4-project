import React from "react";
import "../css/reservation.css"

export default function Reservation() {
    return (<div>
        <div className={"text"}>
            <h1 className={"text--header"}>Reserveren</h1>
            <p className={"text--description"}>Reserveer nu een tafel!</p>
        </div>
        <form className={"form"}>
            <div className={"form--upper"}>
                <input type="text" name="persons" placeholder="1 persoon"/>
                <input type="date" name="date" placeholder="mm/dd/yyyy"/>
                <input type="time" name="time" placeholder="tijd"/>
                <input type="text-area" name="text" placeholder="bericht"/>
            </div>
            <h3>Voorkeuren</h3>
            <div className={"form--lower"}>
                <label>
                    Locatie:
                </label>
                <input type="dropdown" name="location" placeholder="binnen"/>
                <label>
                    Verdieping:
                </label>
                <input type="dropdown" name="verdieping" placeholder="1"/>
                <label>
                    Type stoel:
                </label>
                <input type="dropdown" name="stoel" placeholder="bank"/>
            </div>
            <div className={"form--submit"}>
                <input type="submit" value=" Plaats reservering"/>
            </div>
        </form>
    </div>)
}


