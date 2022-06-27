import React from "react";
import Gallery from "./Gallery";

function GalleryPhoto() {
  const [gallery, setGallery] = React.useState(null);

  React.useEffect(() => {
    function getGallery() {
      fetch("http://localhost:5000/gallerij")
        .then((res) => res.json())
        .then((data) => {
          if (!data) {
            return "Er is iets foutgegaan";
          }
          setGallery(data.gallerij);
        });
    }
    getGallery();
  }, []);

  if (!gallery) {
    return null;
  }

  //map through the gallery and get
  const GalleryPhoto = gallery.map((gallerijfoto) => {
    return (
      <Gallery
        key={gallerijfoto.id}
        photo={require(`../images/${gallerijfoto.foto}`)}
        title={gallerijfoto.naam}
      />
    );
  });

  return <div className="gallerijfotos--info">{GalleryPhoto}</div>;
}

export default GalleryPhoto;
