import React from "react";
import "../css/reservations.css";
import ReservatieItem from "./ReservatieItem";

function ReservatieBox({data, id, type, reservations, setReservations}) {
    return (
        <ReservatieItem
            key={id}
            data={data}
            id={id}
            type={type}
            reservations={reservations}
            setReservations={setReservations}
        />
    );
}

export default ReservatieBox;
