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
      const res = await httpClient.post("/api/title_change", {
        albumTitle,
        path,
        newTitle,
      });

      if (!res.data.success) logout();
      else {
        console.log("Title change happened: ", newTitle);
        getAlbums();
      }
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

  return (
    <div
      className="PhotoCard"
      onClick={(e) => setSelectedPhoto({ title, path, date, size })}
    >
      <div className="overlay">
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
