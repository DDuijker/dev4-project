import React, {useState, useEffect} from "react";
import "../css/tables.css"
import get_tables from "../connect_backend";
import AddTable from "../components/AddTable";

export default function Tables({medewerker}) {
    const [tables, setTables] = useState([]);
    if (!medewerker) {
        window.location.href = "/login";
    }

    useEffect(function getTables() {
        get_tables(setTables)
    }, []);

    const boxes = tables.map((table) => {
        return <div className={"table"} key={table.tafel_id}>
            <h4 className={"table-number"}>Tafelnummer: {table.tafel_id}</h4>
            <h4 className={"table--persons"}>{table.aantal_personen} personen</h4>
            <h4 className={"table--location"}>tafel bevindt zich {table.locatie}</h4>
            <h4 className={"table--floor"}>Verdieping {table.verdieping}</h4>
            <h4 className={"table--seating"}>Type zitting: {table.type_zitting}</h4>
        </div>
    })

    return (
        <div>
            <h1>Tafels</h1>
            <div className={"all-tables"}>
                {tables ? boxes : <div>Er zijn nog geen tafels</div>}
                { // onclick of a button, load the add table form
                }<AddTable/>
            </div>
        </div>
    )
}