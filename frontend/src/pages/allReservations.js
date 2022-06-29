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


    let id = 1;
    const boxes = reservatieItems.map((box) => {
        id++;

        return (
            <ReservatieBox data={box} key={id} id={id}/>
        );

    });

    return (
        <div>
            <h1>Alle reservaties</h1>
            <div className={"all-reservations"}>
                {reservatieItems.length > 0 ? boxes :
                    <h1>Er zijn geen reserveringen</h1>}
            </div>
        </div>
    );
}
