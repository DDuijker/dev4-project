import React from "react";
import "../css/reservation.css";
import { Link } from "react-router-dom";
import { reservation } from "../connect_backend";

export default function Reservation({ loggedIn }) {
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
    if (event.target.date.value === "") {
      alert("Vul alle velden in");
      return;
    }

    //make sure that a customer can't select a date in the past
    let date = new Date(event.target.date.value);
    let today = new Date();
    if (date < today) {
      alert("Kies een datum in de toekomst");
      return;
    }

    //make sure that a customer can't select a date later than 6 months from now
    let sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    if (date > sixMonthsFromNow) {
      alert("Kies een vroegere datum");
      return;
    }
    // get the date from datepicker without the time
    let dateString = date.toISOString().slice(0, 10);

    // get the time from datepicker
    var hour = new Date(event.target.date.value).getHours();
    var minute = new Date(event.target.date.value).getMinutes();
    var timeStart = hour + ":" + minute;
    //add 2 hours to time
    var time2 = new Date(event.target.date.value).getHours() + 2;
    var timeEnd = time2 + ":" + minute;

    //get data from the form
    let data = {
      aantal_personen: event.target.personen.value,
      date: dateString,
      timeStart: timeStart,
      timeEnd: timeEnd,
      text: event.target.text.value,
      voorkeur_locatie: event.target.locaties.value,
      voorkeur_verdieping: event.target.verdiepingen.value,
      voorkeur_zitting: event.target.stoelen.value,
      tijd_van_reservatie: new Date(),
    };

    //send it to the backend
    reservation(data, setError, false);

    //clear the form
    event.target.reset();
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
          <input id="datePicker" type="datetime-local" name="date" />
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
