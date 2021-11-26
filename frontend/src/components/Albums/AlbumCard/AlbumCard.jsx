import "./AlbumCard.css";
import React, { useState } from "react";
import PhotoCard from "./PhotoCard/PhotoCard";
import PhotoDetails from "./PhotoDetails/PhotoDetails";
import AlbumCardContext from "./AlbumCardContext/AlbumCardContext";

export default function AlbumCard({ title, date, photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="AlbumCard">
      <AlbumCardContext.Provider
        value={{
          selectedPhoto,
          setSelectedPhoto,
          photos,
          albumTitle: title,
        }}
      >
        {selectedPhoto && <PhotoDetails />}
        <div className="info">
          <h2 className="title">{title}</h2>
          <p className="date">{new Date(date).toLocaleDateString()}</p>
        </div>
        <div className="content">
          {photos.map((p, i) => (
            <PhotoCard
              key={i}
              title={p.title}
              date={p.date}
              path={p.path}
              size={p.size}
            />
          ))}
        </div>
      </AlbumCardContext.Provider>
    </div>
  );
}
