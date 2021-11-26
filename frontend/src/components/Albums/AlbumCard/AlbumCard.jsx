import "./AlbumCard.css";
import React, { useState, useContext } from "react";
import PhotoCard from "./PhotoCard/PhotoCard";
import PhotoDetails from "./PhotoDetails/PhotoDetails";
import AlbumCardContext from "./AlbumCardContext/AlbumCardContext";
import AlbumContext from "../AlbumContext/AlbumContext";
import { connect } from "react-redux";
import { logout } from "../../../actions/authActions";
import httpClient from "axios";

const AlbumCard = ({ title, date, photos, logout }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { getAlbums, selectedCategory } = useContext(AlbumContext);

  const sendDeleteAlbumRequest = async () => {
    try {
      await httpClient.delete(`/api/album/${title}`);

      console.log("Album is deleted");
      getAlbums();
    } catch (err) {
      console.log(err?.response?.data);
      if (
        err?.response?.data?.msg &&
        err.response.data.msg.includes("Authentication error")
      )
        logout();
    }
  };

  const deleteAlbum = (e) => {
    if (window.confirm("Törlöd az albumot ?")) sendDeleteAlbumRequest();
  };

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
        <svg onClick={deleteAlbum} viewBox="0 0 448 512">
          <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
        </svg>

        <div className="info">
          <h2 className="title">{title}</h2>
          <p className="date">{new Date(date).toLocaleDateString()}</p>
        </div>
        <div className="content">
          {(function () {
            const filtered = photos
              .filter(
                (p) =>
                  p.categories.includes(selectedCategory) || !selectedCategory
              )
              .map((p, i) => (
                <PhotoCard
                  key={i}
                  title={p.title}
                  date={p.date}
                  path={p.path}
                  size={p.size}
                  photoCategories={p.categories}
                />
              ));

            return filtered.length ? (
              filtered
            ) : (
              <p>Nincs kép a választott kategóriában!</p>
            );
          })()}
        </div>
      </AlbumCardContext.Provider>
    </div>
  );
};

export default connect(null, { logout })(AlbumCard);
