import React, {useEffect, useState} from "react";
import ReservatieBox from "../components/ReservatieBox";
import "../css/reservations.css";
import {getCookie} from "../connect_backend";

export default function AllReservations() {
    const [reservatieItems, setReservatieItems] = useState([]);
    const [order, setOrder] = useState("asc");
    // eslint-disable-next-line no-unused-vars
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
    }, []);

    // if the token is not a staff token, redirect to home
    if (!getCookie("staff_token")) {
        window.location.href = "/";
    }


    // make an option to filter the reservations by date
    async function sort(event) {
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


    const boxes = reservatieItems.map((box, index) => {
        // if the filter is all, show all reservations
        return (
            <ReservatieBox data={box} key={index} id={box.id} type={"all"}/>
        );

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
            </div>
            <div className={"all-reservations"}>
                {reservatieItems.length > 0 ? boxes :
                    <h1>Er zijn geen reserveringen</h1>}
            </div>
            {error && <h1 className={"error-text"}>{error}</h1>}
        </div>
    );
}
