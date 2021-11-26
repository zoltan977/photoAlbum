import "./PhotoCard.css";
import React from "react";

export default function PhotoCard({ title, date, path }) {
  return (
    <div className="PhotoCard">
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
