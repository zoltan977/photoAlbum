import "./PhotoDetails.css";
import React, { useContext } from "react";
import AlbumCardContext from "../AlbumCardContext/AlbumCardContext";

export default function PhotoDetails() {
  const { selectedPhoto, setSelectedPhoto, photos } =
    useContext(AlbumCardContext);

  const prev = (e) => {
    const index = photos.findIndex((p) => p.path === selectedPhoto.path);
    if (index >= 1) setSelectedPhoto(photos[index - 1]);
  };
  const next = (e) => {
    const index = photos.findIndex((p) => p.path === selectedPhoto.path);
    if (index <= photos.length - 2) setSelectedPhoto(photos[index + 1]);
  };

  return (
    <div className="PhotoDetails">
      <button className="close" onClick={(e) => setSelectedPhoto(null)}>
        X
      </button>
      <button onClick={prev} type="button">
        -
      </button>
      <div className="image">
        <img src={`/photos/${selectedPhoto.path}`} alt="" />
      </div>
      <button onClick={next} type="button">
        +
      </button>
    </div>
  );
}
