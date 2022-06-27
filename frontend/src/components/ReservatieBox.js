import React from "react";
//import "../css/menu.css";
import ReservatieItem from "./ReservatieItem";

function ReservatieBox({ data, id }) {
  return (
    <div className={"reservatie--box"}>
      <ReservatieItem
          key={id}
          data={data}
      />
    </div>
  );
}

export default ReservatieBox;
