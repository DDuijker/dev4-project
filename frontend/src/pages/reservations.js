import React from "react";
import '../css/reservations.css'
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

    let id = 1;
    const boxes = reservations.map((box) => {
        id++;
        console.log(box);
        return <ReservatieBox data={box} key={id} id={id}/>;
    });


    return (
        <div className={"my-reservations"}>
            <h1>Reservations</h1>
            {reservations.length > 0 ? (boxes
            ) : <h2>U heeft nog geen reserveringen</h2>
            }
        </div>
    )
}
