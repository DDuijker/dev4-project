import React from "react";
import "../css/reservation.css";
import { Link } from "react-router-dom";
import { reservation } from "../connect_backend";

export default function Reservation({ loggedIn }) {
  //TODO: if user isn't logged in you can't place a reservation
  //TODO: check if the form is filled
  //TODO: make sure that a customer can't select a date in the past
  //TODO: make sure someone is first logged in
  //TODO: insert icons at the end of the submit
  //TODO: send it to the backend

  const [error, setError] = React.useState("");
  if (!loggedIn) {
    return (
      <div className={"not-loggedin"}>
        <h2>U moet ingelogd zijn om te kunnen reserveren</h2>
        <Link to={"/login"}>
          <button>Klik hier om in te loggen</button>
        </Link>
      </div>
    );
  }

  function submit(event) {
    //check if the form is filled
    event.preventDefault();
    if (event.target.date.value === "" || event.target.time.value === "") {
      setError("Vul alle velden in");
      return;
    }

    //make sure that a customer can't select a date in the past
    let date = new Date(event.target.date.value);
    let today = new Date();
    if (date < today) {
      setError("Kies een datum in de toekomst");
      return;
    }
    //make sure that a customer can't select a date later than 6 months from now
    let sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    if (date > sixMonthsFromNow) {
      setError("Kies een vroegere datum");
      return;
    }

    //show a second timestamp of 2 hours after the chosen time
    let time = new Date(event.target.time.value);
    time.setHours(time.getHours() + 2);
    let timeString = time.toLocaleTimeString("nl-NL");
    console.log(event.target.time.value);

    //get data from the form
    let data = {
      aantal_personen: event.target.personen.value,
      date: event.target.date.value,
      time: event.target.time.value,
      text: event.target.text.value,
      voorkeur_locatie: event.target.locaties.value,
      voorkeur_verdieping: event.target.verdiepingen.value,
      voorkeur_zitting: event.target.stoelen.value,
      tijd_van_reservatie: new Date(),
    };
    console.log(data);
    //send it to the backend
    //reservation(data, setError, false);

    //clear the form
    //event.target.reset();
  }

  return (
    <div>
      <div className={"reservation-text"}>
        <h1 className={"text--header"}>Reserveren</h1>
        <p className={"text--description"}>Reserveer nu een tafel!</p>
      </div>
      <form className={"form"} onSubmit={submit}>
        <div className={"form--upper"}>
          <select id={"personen"} className={"dropdown"}>
            <option value={1}>1 persoon</option>
            <option value={2}>2 personen</option>
            <option value={4}>4 personen</option>
            <option value={6}>6 personen</option>
            <option value={8}>8 personen</option>
            <option value={10}>10 personen</option>
          </select>
          <input type="date" name="date" placeholder="mm/dd/yyyy" />
          <input type="time" name="time" placeholder="tijd" />
          <input type="text-area" name="text" placeholder="bericht" />
        </div>
        <h3>Voorkeuren</h3>
        <div className={"form--lower"}>
          <label>Locatie:</label>
          <select id={"locaties"} className={"dropdown"}>
            <option value={"geen"}>Geen</option>
            <option value={"binnen"}>Binnen</option>
            <option value={"buiten"}>Buiten</option>
          </select>
          <label>Verdieping:</label>
          <select id={"verdiepingen"} className={"dropdown"}>
            <option value={"geen"}>Geen</option>
            <option value={"1"}>1e verdieping</option>
            <option value={"2"}>2e verdieping</option>
          </select>
          <label>Type stoel:</label>
          <select id={"stoelen"} className={"dropdown"}>
            <option value={"geen"}>Geen</option>
            <option value={"stoel"}>Stoel</option>
            <option value={"bank"}>Bank</option>
          </select>
        </div>
        <div className={"error-text"}>{error}</div>
        <div className={"form--submit"}>
          <input type="submit" value=" Plaats reservering" />
        </div>
      </form>
    </div>
  );
}
