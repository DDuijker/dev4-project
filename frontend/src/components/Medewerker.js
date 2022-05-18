import React from "react";
/*import medewerkerData from "./pages/medewerkerData";*/

export default function Medewerker(props) {
  console.log(props);
  return (
    <div className="contact-card">
      <img src={props.foto} alt="img" />
      <h3>{props.naam}</h3>
      <h4>{props.titel}</h4>
      <p>{props.ervaring}</p>
    </div>
  );
}
