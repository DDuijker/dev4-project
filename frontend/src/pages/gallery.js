import React, { useEffect, useState } from "react";
import GalleryPhoto from "../components/GalleryPhoto";

export default function Gallery() {
  const [galleryPhoto, setGalleryData] = useState(null);

  useEffect(function () {
    async function getData() {
      console.log("ok");
      fetch("http://localhost:5000/gallery")
        .then((response) => response.json())
        .then((data) => {
          setGalleryData(data.gallerij);
          console.log(data);
        });
    }

    getData();
  }, []);

  return (
    <div>
      <h1>Gallery</h1>
    </div>
  );
}
