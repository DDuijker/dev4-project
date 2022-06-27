//make React component with a form to add a table
import React from "react";
import "../css/tables.css";
import {useState} from "react";
import {add_table} from "../connect_backend";

export default function AddTable() {
    const [table, setTable] = useState([]);

    //add a table to the database
    //when the form is submitted, send the data to the backend
    //when the backend responds, reload the page
    function handleSubmit(event) {
        event.preventDefault();
        console.log("submit");
        //get data from the form
        const data = {
            aantal_personen: event.target.aantal_personen.value,
            locatie: event.target.locatie.value,
            verdieping: event.target.verdieping.value,
            type_zitting: event.target.type_zitting.value
        };
        //send data to the backend
        console.log(data);
        add_table(data);
    }
    //make a form to add a table
    return (<div>
        <h3>Voeg een tafel toe</h3>
        <form onSubmit={handleSubmit} className={"addTableForm"}>
            <select className={"dropdown"} id={"aantal_personen"}>
                <option value={1}>1 persoon</option>
                <option value={2}>2 personen</option>
                <option value={4}>4 personen</option>
                <option value={6}>6 personen</option>
                <option value={8}>8 personen</option>
                <option value={10}>10 personen</option>
            </select>
            <h3 className={"voorkeuren"}>Voorkeuren</h3>
            <label>Locatie:</label>
            <select className={"dropdown"} id={"locatie"}>
                <option value={"binnen"}>Binnen</option>
                <option value={"buiten"}>Buiten</option>
            </select>
            <label>Verdieping:</label>
            <select className={"dropdown"} id={"verdieping"}>
                <option value={"1"}>1e verdieping</option>
                <option value={"2"}>2e verdieping</option>
            </select>
            <label>Type stoel:</label>
            <select className={"dropdown"} id={"type_zitting"}>
                <option value={"stoel"}>Stoel</option>
                <option value={"bank"}>Bank</option>
            </select>
            <button className={"button-add-table"}>Voeg toe</button>
        </form>
    </div>)
}
