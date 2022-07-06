import React from "react";
import "../css/reservations.css";
import ReservatieItem from "./ReservatieItem";

function ReservatieBox({data, id, type, reservations, setReservations}) {

    // check if the reservation is in the past
    const isPast = data.date < new Date().toISOString().slice(0, 10);

    // check if the reservation is in the future
    const isFuture = data.date > new Date().toISOString().slice(0, 10);

    // check if the reservation is in the current day
    const isToday = data.date === new Date().toISOString().slice(0, 10);

    // if the reservation is in the past, have a text above it saying that it is in the past
    const pastText = isPast ? "In het verleden" : "";
    // if the reservation is in the future, have a text above it saying that it is in the future
    const futureText = isFuture ? "In de toekomst" : "";
    // if the reservation is in the current day, have a text above it saying that it is in the current day
    const todayText = isToday ? "Vandaag" : "";

    return (
        <div className={"reservation-box"}>
            <div className={"reservation-box-header"}>
                {isPast ? <h2>{pastText}</h2> : null}
                {isFuture ? <h2>{futureText}</h2> : null}
                {isToday ? <h2>{todayText}</h2> : null}
            </div>
            <ReservatieItem
                key={id}
                data={data}
                id={id}
                type={type}
                reservations={reservations}
                setReservations={setReservations}
            />
        </div>
    );
}

export default ReservatieBox;
