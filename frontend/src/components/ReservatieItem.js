import React from "react";

function ReservatieItem({data}) {
    return (
        <div>
            <h4>Aantal personen: {data.aantal_personen}</h4>
            <span> op: {data.datum}</span>
            <p>om: {data.tijd}</p>
        </div>
    );
}

export default ReservatieItem;
