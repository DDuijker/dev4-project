import React from "react";
import "../css/gallerij.css";

export default function Gallery(props) {
  return (
    <div className="row">
      <div className="gallerij-card">
        <img src={props.photo} alt="GalleryImage" />
        <h4>{props.naam && props.naam}</h4>
      </div>
    </div>
  );
}
