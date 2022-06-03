import React from "react";

export default function Staff(props) {
    return (
        <div className="contact-card">
            <img src={props.foto} alt="img"/>
            <h3>{props.naam}</h3>
            <h4>{props.titel}</h4>
            <p>{props.ervaring}</p>
        </div>
    );
}
