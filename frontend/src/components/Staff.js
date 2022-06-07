import React from "react";

export default function Staff(props) {
    return (
        <div className="contact-card">
            <img src={props.photo} alt="img"/>
            <h3>{props.firstname} {props.infix && props.infix} {props.lastname}</h3>
            <h4>{props.title}</h4>
            <p>{props.description && props.description}</p>
        </div>
    );
}
