import React, { useEffect, useState } from "react";
import GalleryPhoto from "../components/GalleryPhoto";
import "../css/gallerij.css";

export default function gallery() {
  /* const [galleryPhoto, setGalleryData] = useState(null);

  useEffect(function () {
    async function getData() {
      fetch("http://localhost:5000/gallery")
        .then((response) => response.json())
        .then((data) => {
          setGalleryData(data.gallerij);
        });
    }
    getData();
  }, []);
 */
  return (
    <div>
      <h1>
        <GalleryPhoto />
      </h1>
    </div>
  );
}
