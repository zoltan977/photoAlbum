import React from "react";
import "./AutoSearch.css";

export default function AutoSearch({ filteredAlbumTitles, formChange }) {
  return (
    <div className="AutoSearch">
      {filteredAlbumTitles.map((f, i) => (
        <p
          key={i}
          onClick={(e) => {
            formChange({ target: { name: "title", value: f } });
          }}
        >
          {f}
        </p>
      ))}
    </div>
  );
}
