import React from "react";
import '../css/reservations.css'
import {delete_reservation} from "../connect_backend";
import EditReservation from "./EditReservation";


function ReservatieItem({data, type, id, reservations, setReservations}) {

    function patchReservation() {
        // set the reservation to editing
        const copyReservations = [...reservations];
        copyReservations[id].editing = true;
        setReservations(copyReservations)
    }


    function deleteReservation() {
        // if the type is "my" then the user can delete the reservation
        let reservatie_id = data.reservatie_id;
        delete_reservation(reservatie_id);
        // get the reservations and set the data again
        const copyReservations = [...reservations];
        copyReservations.splice(data.reservatie_id, 1);
        setReservations(copyReservations);
    }

    if (data.editing) {
        return <EditReservation reservation={data}/>
    }
    return (
        <div className={"reservation-item-text"}>
            {data.voornaam ? (
                    <h3>{data.voornaam} {data.tussenvoegsel && data.tussenvoegsel} {data.achternaam}</h3>) :
                null}
            <h4>Aantal personen: {data.aantal_personen}</h4>
            {data.aantal_kinderstoelen ? <h5>Aantal kinderstoelen: {data.aantal_kinderstoelen}</h5> : null}
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
            <p>Vervoer: {data.voorkeur_vervoer}</p>
            {type === "my" && <button className={"button"} onClick={patchReservation}>Wijzig reservering</button>}
            {type === "my" && <button className={"button"} onClick={deleteReservation}>Annuleer reservering</button>}
        </div>
    );
}

export default ReservatieItem;
