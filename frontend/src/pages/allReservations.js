import React, { useState, useEffect } from "react";
import ReservatieBox from "../components/ReservatieBox";
import "../css/reservations.css";

export default function AllReservations() {
  const [reservatieItems, setReservatieItems] = useState([]);

  useEffect(function () {
    async function getData() {
      fetch("http://localhost:5000/reservatie")
        .then((response) => response.json())
        .then((data) => {
          setReservatieItems(data.reservatie);
          console.log(data.reservatie);
        });
    }
    getData();
  }, []);

  let id = 1;
  const boxes = reservatieItems.map((box) => {
    id++;
    console.log(box);
    // if there is only one reservation, center the box
    if (reservatieItems.length === 1) {
      return (
        <div className={"center-this-one"}>
          <ReservatieBox data={box} key={id} id={id} />;
        </div>
      );
    }
    // if a reservation was in the past, cross it out
    else if (box.datum < new Date()) {
      return (
        <div className={"crossed"}>
          <ReservatieBox data={box} key={id} id={id} />;
        </div>
      );
    } else {
      return (
        <div>
          <ReservatieBox data={box} key={id} id={id} />
        </div>
      );
    }
  });

  return (
    <div>
      <h1>Alle reservaties</h1>
      <div className={"boxes"}>
        <div>{reservatieItems.length > 0 ? boxes : <h1>Er zijn geen reserveringen</h1>}</div>
      </div>
    </div>
  );
}
