import React from "react";
import '../css/reservations.css'
import {getMyReservations} from "../connect_backend";

export default function Reservations() {
    const [reservations, setReservations] = React.useState();

    // get the reservations
    React.useEffect(() => {
        getMyReservations(setReservations);
    }, []);


    return (
        <div className={"my-reservations"}>
            <h1>Reservations</h1>
            {reservations > 0 ? (reservations.map((reservation) => {
                    return (
                        <div>
                            <p>{reservation}</p>
                        </div>
                    );
                })
            ) : <h2>U heeft nog geen reserveringen</h2>
            }
        </div>
    )
}
