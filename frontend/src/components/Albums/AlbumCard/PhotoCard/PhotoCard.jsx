import "./PhotoCard.css";
import React, { useContext, useRef } from "react";
import AlbumCardContext from "../AlbumCardContext/AlbumCardContext";
import AlbumContext from "../../AlbumContext/AlbumContext";
import Info from "./Info/Info";
import httpClient from "axios";
import { connect } from "react-redux";
import { logout } from "./../../../../actions/authActions";

const PhotoCard = ({ title, date, path, size, photoCategories, logout }) => {
  console.log("photoCategories", photoCategories);

  const { setSelectedPhoto, albumTitle } = useContext(AlbumCardContext);
  const { getAlbums, categories } = useContext(AlbumContext);

  const send = async (method, endpoint, data) => {
    try {
      await httpClient[method](endpoint, data);

      getAlbums();
    } catch (err) {
      if (
        err?.response?.data?.msg &&
        err.response.data.msg.includes("Authentication error")
      )
        logout();
    }
  };

  const currentTimeout = useRef();
  const titleChange = (value) => {
    clearTimeout(currentTimeout.current);

    currentTimeout.current = setTimeout(() => {
      send("put", "/api/photo/title", { newTitle: value, path, albumTitle });
      console.log("Title change");
    }, 2000);
  };

  const deletePhoto = (e) => {
    e.stopPropagation();

    if (window.confirm("Törlöd a képet ?"))
      send("delete", `/api/photo/${albumTitle}/${path}`);
  };

  const addCategory = (e) => {
    if (e.target.value)
      send("post", `/api/photo/category`, {
        albumTitle,
        path,
        category: e.target.value,
      });
  };

  const removeCategory = (category) => {
    send("delete", `/api/photo/category/${albumTitle}/${path}/${category}`);
  };

  return (
    <div
      className="PhotoCard"
      onClick={(e) => setSelectedPhoto({ title, path, date, size })}
    >
      <div className="overlay">
        <svg onClick={deletePhoto} viewBox="0 0 448 512">
          <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
        </svg>
        <div className="left">
          <Info
            titleChange={titleChange}
            title={title}
            photoCategories={photoCategories}
            addCategory={addCategory}
            removeCategory={removeCategory}
            categories={categories}
            date={date}
          />
        </div>
        <div className="right">
          <Info
            titleChange={titleChange}
            title={title}
            photoCategories={photoCategories}
            addCategory={addCategory}
            removeCategory={removeCategory}
            categories={categories}
            date={date}
          />
        </div>
      </div>
      <img src={`/photos/${path}`} alt="" />
    </div>
  );
};

export default connect(null, { logout })(PhotoCard);
