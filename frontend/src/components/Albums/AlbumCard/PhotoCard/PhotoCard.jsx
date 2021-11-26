import "./PhotoCard.css";
import React, { useContext, useRef } from "react";
import AlbumCardContext from "../AlbumCardContext/AlbumCardContext";
import AlbumContext from "../../AlbumContext/AlbumContext";
import ContentEditable from "../../../ContentEditable/ContentEditable";
import httpClient from "axios";
import { connect } from "react-redux";
import { logout } from "./../../../../actions/authActions";

const PhotoCard = ({ title, date, path, size, logout }) => {
  const { setSelectedPhoto, albumTitle } = useContext(AlbumCardContext);
  const { getAlbums } = useContext(AlbumContext);

  const sendTitleChangeRequest = async (newTitle) => {
    try {
      await httpClient.post("/api/title_change", {
        albumTitle,
        path,
        newTitle,
      });

      console.log("Title change happened: ", newTitle);
      getAlbums();
    } catch (err) {
      console.log("name change error: ", err.response.data);
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
      sendTitleChangeRequest(value);
      console.log("Title change");
    }, 2000);
  };

  const sendDeletePhotoRequest = async () => {
    try {
      await httpClient.post(`/api/delete_photo`, {
        albumTitle,
        path,
      });

      console.log("Photo is deleted");
      getAlbums();
    } catch (err) {
      if (
        err?.response?.data?.msg &&
        err.response.data.msg.includes("Authentication error")
      )
        logout();
    }
  };

  const deletePhoto = async (e) => {
    e.stopPropagation();

    if (window.confirm("Törlöd a képet ?")) sendDeletePhotoRequest();
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
          <div className="info">
            <ContentEditable onChange={titleChange}>
              <p className="title">{title}</p>
            </ContentEditable>
            <p className="date">{new Date(date).toLocaleString()}</p>
          </div>
        </div>
        <div className="right">
          <div className="info">
            <ContentEditable onChange={titleChange}>
              <p className="title">{title}</p>
            </ContentEditable>
            <p className="date">{new Date(date).toLocaleString()}</p>
          </div>
        </div>
      </div>
      <img src={`/photos/${path}`} alt="" />
    </div>
  );
};

export default connect(null, { logout })(PhotoCard);
