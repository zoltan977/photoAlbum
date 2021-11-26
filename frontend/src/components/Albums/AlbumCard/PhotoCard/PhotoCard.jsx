import "./PhotoCard.css";
import React, { useContext } from "react";
import AlbumCardContext from "../AlbumCardContext/AlbumCardContext";

export default function PhotoCard({ title, date, path, size }) {
  const { setSelectedPhoto } = useContext(AlbumCardContext);

  return (
    <div
      className="PhotoCard"
      onClick={(e) => setSelectedPhoto({ title, path, date, size })}
    >
      <div className="overlay">
        <div className="left">
          <div className="info">
            <p className="title">{title}</p>
            <p className="date">{new Date(date).toLocaleString()}</p>
          </div>
        </div>
        <div className="right">
          <div className="info">
            <p className="title">{title}</p>
            <p className="date">{new Date(date).toLocaleString()}</p>
          </div>
        </div>
      </div>
      <img src={`/photos/${path}`} alt="" />
    </div>
  );
}
