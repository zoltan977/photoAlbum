import "./AlbumCard.css";
import React from "react";
import PhotoCard from "./PhotoCard/PhotoCard";

export default function AlbumCard({ title, date, photos }) {
  return (
    <div className="AlbumCard">
      <div className="info">
        <p className="title">{title}</p>
        <p className="date">{new Date(date).toLocaleString()}</p>
      </div>
      <div className="content">
        {photos.map((p, i) => (
          <PhotoCard key={i} title={p.title} date={p.date} path={p.path} />
        ))}
      </div>
    </div>
  );
}
