import React, {useState, useEffect} from "react";
import ReservatieBox from "../components/ReservatieBox";
import "../css/reservations.css";
import {getCookie} from "../connect_backend";

export default function AllReservations() {
    const [reservatieItems, setReservatieItems] = useState([]);

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
    const [order, setOrder] = useState("asc");

    const handleChange = (event) => {
        // set the order to the value of the select
        setOrder(event.target.value);
    }

    useEffect(function () {
        // if the order is asc, sort the reservations by date ascending
        if (order === "asc") {
            setReservatieItems([...reservatieItems].sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            }));
        } else if (order === "desc") {
            // if the order is desc, sort the reservations by date descending
            setReservatieItems([...reservatieItems].sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            }));
        }
    }, [order]);

    const boxes = reservatieItems.map((box, index) => {
        return (
            <ReservatieBox data={box} key={index} id={box.id} type={"all"}/>
        );

    });

    return (
        <div>
            <h1>Alle reservaties</h1>
            {/* make an option to sort the reservations by date */}
            <div className={"filter-by-container"} onChange={handleChange}>
                <select>
                    <option value="asc" id={"asc"}>Oplopend
                    </option>
                    <option value="desc" id={"desc"}>Aflopend
                    </option>
                </select>
            </div>
            <div className={"all-reservations"}>
                {reservatieItems.length > 0 ? boxes :
                    <h1>Er zijn geen reserveringen</h1>}
            </div>
        </div>
    );
}
