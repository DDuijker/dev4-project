import React from "react";

function ReservatieItem({ persons, date, time }) {
  return (
    <div>
      <h4>Aantal personen: {persons}</h4>
      <span> op: {date}</span>
      <p>om: {time}</p>
    </div>
  );
}

export default ReservatieItem;
