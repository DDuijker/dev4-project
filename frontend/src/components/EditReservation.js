import React from "react";
import "../css/reservations.css";
import {patch_reservation} from "../connect_backend";

export default function EditReservation({reservation}) {
    const [error, setError] = React.useState("");

    // get the date and time in a readable format for the form

    function submit(event) {
        event.preventDefault();

        //make sure that a customer can't select a date in the past
        let date = new Date(event.target.date.value);
        let today = new Date();
        if (date < today) {
            setError("Kies een datum in de toekomst");
            return;
        }

        // get the date from datepicker without the time
        let dateString = date.toISOString().slice(0, 10);
        if (dateString.includes("Invalid Date")) {
            setError("Kies een datum");
            return;
        }

        // get the time from datepicker
        let hour = new Date(event.target.date.value).getHours();
        let minute = new Date(event.target.date.value).getMinutes();
        let timeStart = hour + ":" + minute;
        //add 2 hours to time
        let time2 = new Date(event.target.date.value).getHours() + 2;
        let timeEnd = time2 + ":" + minute;


        const updatedData = {
            id: reservation.reservatie_id,
            aantal_personen: event.target.personen.value,
            aantal_kinderstoelen: event.target.kinderstoelen.value,
            date: dateString,
            timeStart: timeStart,
            timeEnd: timeEnd,
            bericht: event.target.text.value,
            voorkeur_locatie: event.target.locaties.value,
            voorkeur_verdieping: event.target.verdiepingen.value,
            voorkeur_zitting: event.target.stoelen.value,
            voorkeur_vervoer: event.target.vervoer.value,
            tafel_id: reservation.tafel_id
        }

        patch_reservation(updatedData)
        window.location.reload()
    }

    return (
        <div className={"reservation-item-text"}>
            <div className={"edit-reservation"}>
                <h3>Edit Reservation</h3>
                <form className={"form"} onSubmit={submit}>
                    <div className={"form--upper"}>
                        <select id={"personen"} className={"dropdown"} defaultValue={reservation.aantal_personen}>
                            <option value={1}>1 persoon</option>
                            <option value={2}>2 personen</option>
                            <option value={4}>4 personen</option>
                            <option value={6}>6 personen</option>
                            <option value={8}>8 personen</option>
                            <option value={10}>10 personen</option>
                        </select>
                        <select id={"kinderstoelen"} className={"dropdown"}>
                            <option value={0}>Geen kinderstoelen</option>
                            <option value={1}>1 stoel</option>
                            <option value={2}>2 stoelen</option>
                            <option value={3}>3 stoelen</option>
                            <option value={4}>4 stoelen</option>
                            <option value={5}>5 stoelen</option>
                        </select>
                        <input id="datePicker" type="datetime-local" name="date"/>
                        <input type="text-area" name="text" defaultValue={reservation.bericht}/>
                    </div>
                    <h3>Voorkeuren</h3>
                    <div className={"form--lower"}>
                        <label>Locatie:</label>
                        <select id={"locaties"} className={"dropdown"} defaultValue={reservation.voorkeur_locatie}>
                            <option value={"geen"}>Geen</option>
                            <option value={"binnen"}>Binnen</option>
                            <option value={"buiten"}>Buiten</option>
                        </select>
                        <label>Verdieping:</label>
                        <select id={"verdiepingen"} className={"dropdown"}
                                defaultValue={reservation.voorkeur_verdieping}>
                            <option value={"geen"}>Geen</option>
                            <option value={"1"}>1e verdieping</option>
                            <option value={"2"}>2e verdieping</option>
                        </select>
                        <label>Type stoel:</label>
                        <select id={"stoelen"} className={"dropdown"} defaultValue={reservation.voorkeur_zitting}>
                            <option value={"geen"}>Geen</option>
                            <option value={"stoel"}>Stoel</option>
                            <option value={"bank"}>Bank</option>
                        </select>
                        <label>Vervoer:</label>
                        <select id={"vervoer"} className={"dropdown"}>
                            <option value={"nee"}>nee</option>
                            <option value={"ja"}>ja</option>
                        </select>
                    </div>
                    <div className={"error-text"}>{error}</div>
                    <button className={"button"} type="submit">Wijzig reservering</button>
                </form>
            </div>
        </div>

    );
}