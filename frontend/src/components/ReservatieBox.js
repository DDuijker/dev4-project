import React from "react";
import "../css/reservations.css";
import ReservatieItem from "./ReservatieItem";

function ReservatieBox({data, id}) {
    return (
        <ReservatieItem
            key={id}
            data={data}
        />
    );
}

export default ReservatieBox;
