import React from "react";
import '../css/reservations.css'
import {delete_reservation} from "../connect_backend";
import EditReservation from "./EditReservation";


function ReservatieItem({data, type, id, reservations, setReservations}) {

    function patchReservation() {
        // set the reservation to editing
        console.log("reservations", reservations);
        const copyReservations = [...reservations];
        copyReservations[id].editing = true;
        console.log("copyReservations", copyReservations);
        setReservations(copyReservations)
    }


    function deleteReservation() {
        // if the type is "my" then the user can delete the reservation
        let reservatie_id = data.reservatie_id;
        deleteReservation(reservatie_id);
        // get the reservations and set the data again
        const copyReservations = [...reservations];
        copyReservations.splice(data.reservatie_id, 1);
        setReservations(copyReservations);
    }

    if (data.editing) {
        console.log(data)
        return <EditReservation reservation={data}/>
    }
    return (
        <div className={"reservation-item-text"}>
            {data.voornaam ? (
                    <h3>{data.voornaam} {data.tussenvoegsel && data.tussenvoegsel} {data.achternaam}</h3>) :
                null}
            <h4>Aantal personen: {data.aantal_personen}</h4>
            <p>op: {data.date}</p>
            <p>van {data.timeStart} tot {data.timeEnd}</p>
            <h5>Tafelnummer: {data.tafel_id ? data.tafel_id : "Nog geen tafel toegewezen"}</h5>
            {data.bericht ? (
                <p>Bericht: {data.bericht}</p>
            ) : null}
            <h4>Voorkeuren</h4>
            <p>Locatie: {data.voorkeur_locatie}</p>
            <p>Verdieping: {data.voorkeur_verdieping}</p>
            <p>Stoel: {data.voorkeur_zitting}</p>
            {type === "my" && <button className={"button"} onClick={patchReservation}>Wijzig reservering</button>}
            {type === "my" && <button className={"button"} onClick={deleteReservation}>Annuleer reservering</button>}
        </div>
    );
}

export default ReservatieItem;
