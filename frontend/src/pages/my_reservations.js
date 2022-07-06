import React from "react";
import "../css/reservations.css";
import {getMyReservations} from "../connect_backend";
import ReservatieBox from "../components/ReservatieBox";

export default function Reservations() {
    const [reservations, setReservations] = React.useState();

    // get the reservations
    React.useEffect(() => {
        getMyReservations(setReservations);
    }, []);

    if (!reservations) {
        return null;
    }

    const boxes = reservations.map((box, index) => {
        return <ReservatieBox data={box} key={index} id={index} type={"my"}
                              reservations={reservations}
                              setReservations={setReservations}/>;
    });

    return (
        <div className={"my-reservations"}>
            <h1>Reservations</h1>
            <div className={"all-reservations"}>
                {reservations.length > 0 ? (
                    boxes
                ) : (
                    <h2>U heeft nog geen reserveringen</h2>
                )}
            </div>
        </div>
    );
}
