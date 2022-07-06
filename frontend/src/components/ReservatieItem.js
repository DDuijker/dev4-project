import React from "react";
import '../css/reservations.css'
import {delete_reservation} from "../connect_backend";

function ReservatieItem({data, type, reservations, setReservations}) {

    function handleClick() {
        // if the type is "my" then the user can delete the reservation
        let reservatie_id = data.reservatie_id.toString();
        delete_reservation(reservatie_id);
        // get the reservations and set the data again
        const copyReservations = [...reservations];
        copyReservations.splice(data.reservatie_id, 1);
        setReservations(copyReservations);
    }

    return (
        <div className={"reservation-item-text"}>
            <h3>{data.voornaam} {data.tussenvoegsel && data.tussenvoegsel} {data.achternaam}</h3>
            <h4>Aantal personen: {data.aantal_personen}</h4>
            <p>op: {data.date}</p>
            <p>van {data.timeStart} tot {data.timeEnd}</p>
            <h5>Tafelnummer: {data.tafel_id}</h5>
            <p>{data.bericht && data.bericht}</p>
            <h4>Voorkeuren</h4>
            <p>Locatie: {data.voorkeur_locatie}</p>
            <p>Verdieping: {data.voorkeur_verdieping}</p>
            <p>Stoel: {data.voorkeur_zitting}</p>
            {type === "my" && <button onClick={handleClick}>Annuleer reservering</button>}
        </div>
    );
}

export default ReservatieItem;
