import React from "react";
import '../css/reservations.css'

function ReservatieItem({data}) {
    console.log(data);
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

        </div>
    );
}

export default ReservatieItem;
