import React from "react";
import '../css/reservations.css'

function ReservatieItem({data}) {
    return (
        <div className={"reservation-item-text"}>
            <h4>Aantal personen: {data.aantal_personen}</h4>
            <p>op: {data.datum}</p>
            <p>om: {data.tijd}</p>
        </div>
    );
}

export default ReservatieItem;
