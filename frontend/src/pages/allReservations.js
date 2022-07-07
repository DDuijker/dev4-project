import React, {useEffect, useState} from "react";
import ReservatieBox from "../components/ReservatieBox";
import "../css/reservations.css";
import get_tables, {get_reservation_by_table, getCookie} from "../connect_backend";

export default function AllReservations() {
    const [reservatieItems, setReservatieItems] = useState([]);
    const [tables, setTables] = useState([]);
    const [order, setOrder] = useState("asc");
    const [tableFilter, setTableFilter] = useState("all");
    const [error, setError] = useState("");

    useEffect(function () {
        async function getData() {
            fetch("http://localhost:5000/reservatie")
                .then((response) => response.json())
                .then((data) => {
                    setReservatieItems(data.reservatie);
                });
        }

        getData();
        get_tables(setTables);
    }, []);

    // if the token is not a staff token, redirect to home
    if (!getCookie("staff_token")) {
        window.location.href = "/";
    }


    // make an option to filter the reservations by date
    //TODO: sort doesn't work the first time you click on it
    async function sort(event) {
        console.log(event.target.value);
        setOrder(event.target.value);
        // if the order is asc, sort the reservations by date ascending
        if (order === "asc") {
            await setReservatieItems([...reservatieItems].sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            }));
        } else if (order === "desc") {
            // if the order is desc, sort the reservations by date descending
            await setReservatieItems([...reservatieItems].sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            }));
        }
    }

    //TODO: filter gets an error
    // moet het in een use effect?
    function filter(event) {
        console.log(event.target.value);
        setTableFilter(event.target.value);
        // if the table filter is all, show all reservations
        if (tableFilter === "all") {
            setReservatieItems([...reservatieItems]);
        } else if (tableFilter) {
            console.log("filter", tableFilter);
            //show only reservations with the selected table
            get_reservation_by_table(tableFilter, setReservatieItems, setError);

        } else {
            return null;
        }
    }


    const boxes = reservatieItems.map((box, index) => {
        // if the filter is all, show all reservations
        return (
            <ReservatieBox data={box} key={index} id={box.id} type={"all"}/>
        );

    });

    const tables_options = tables.map((box, index) => {
        return (
            <option key={index} value={box.tafel_id}>{box.tafel_id}</option>
        )
    });

    return (
        <div>
            <h1>Alle reservaties</h1>
            {/* make an option to sort the reservations by date */}
            <div className={"filter-by-container"}>
                <div>
                    <span>Sorteer op datum: </span>
                    <select id={"datum"} onChange={sort}>
                        <option value="asc" id={"asc"}>Oplopend
                        </option>
                        <option value="desc" id={"desc"}>Aflopend
                        </option>
                    </select>
                </div>

                <div onChange={filter}>
                  <span>
                    Filter op tafel:
                </span>
                    <select id={"tafel"} className={"filter-by-container"} onChange={filter}>
                        <option value="all">Alle</option>
                        {tables_options}
                    </select>
                </div>

            </div>
            <div className={"all-reservations"}>
                {reservatieItems.length > 0 ? boxes :
                    <h1>Er zijn geen reserveringen</h1>}
            </div>
            {error && <h1 className={"error-text"}>{error}</h1>}
        </div>
    );
}
