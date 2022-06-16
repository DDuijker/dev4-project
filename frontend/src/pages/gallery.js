import React, { useEffect, useState } from "react";

export default function Gallery() {
  const [galleryPhoto, setGalleryData] = useState(null);

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

  return (
    <div>
      <h1>Gallery</h1>
    </div>
  );
}
