import React, { useState, useEffect } from "react";
import ReservatieBox from "../components/ReservatieBox";
import ReservatieItem from "../components/ReservatieItem";

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

  if (!reservatieItems) {
    return null;
  }

  let id = 1;
  const boxes = reservatieItems.map((box) => {
    id++;
    console.log(box);
    return <ReservatieBox data={box} key={id} id={id} />;
  });

  return (
    <div>
      <h1>Alle reservaties</h1>
      <div>{boxes}</div>
    </div>
  );
}
