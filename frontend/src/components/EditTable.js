import React from 'react';
import '../css/tables.css';


export default function EditTable(table) {
    return (
        <form className={"addTableForm"} key={table.tafel_id}>
            <h4 className={"table-number"}>Tafelnummer: {table.tafel_id}</h4>
            <select className={"dropdown"} id={"aantal_personen"} defaultValue={table.aantal_personen}>
                <option value={1}>1 persoon</option>
                <option value={2}>2 personen</option>
                <option value={4}>4 personen</option>
                <option value={6}>6 personen</option>
                <option value={8}>8 personen</option>
                <option value={10}>10 personen</option>
            </select>
            <h3 className={"voorkeuren"}>Voorkeuren</h3>
            <label>Locatie:</label>
            <select className={"dropdown"} id={"locatie"} defaultValue={table.locatie}>
                <option value={"binnen"}>Binnen</option>
                <option value={"buiten"}>Buiten</option>
            </select>
            <label>Verdieping:</label>
            <select className={"dropdown"} id={"verdieping"} defaultValue={table.verdieping}>
                <option value={"1"}>1e verdieping</option>
                <option value={"2"}>2e verdieping</option>
            </select>
            <label>Type stoel:</label>
            <select className={"dropdown"} id={"type_zitting"} defaultValue={table.type_zitting}>
                <option value={"stoel"}>Stoel</option>
                <option value={"bank"}>Bank</option>
            </select>
            <button onClick={() => {
                table.editing = false;
                //make a patch function for the backend
            }} className={"button-add-table"}>Verander
            </button>
        </form>
    )
}