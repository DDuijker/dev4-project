import React from "react";
//import "../css/menu.css";
import ReservatieItem from "./ReservatieItem";

function ReservatieBox({ data, id }) {
  return (
    <div className={"reservatie--box"}>
      <ReservatieItem
        key={id}
        persons={data.aantal_personen}
        date={data.datum}
        time={data.tijd}
      />
    </div>
  );
}

export default ReservatieBox;
