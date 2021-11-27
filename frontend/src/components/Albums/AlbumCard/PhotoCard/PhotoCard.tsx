import "./PhotoCard.css";
import React, { useContext, useRef } from "react";
import AlbumCardContext, { albumCardContextType } from "../AlbumCardContext/AlbumCardContext";
import AlbumContext, { albumContextType } from "../../AlbumContext/AlbumContext";
import Info from "./Info/Info";
import { connect } from "react-redux";
import { actionType, logout } from "./../../../../actions/authActions";
import sendQuery from "../../../../utils/modifyApiData";
import { photoType } from "../../Albums";

type photoCardPropsType = {
  photo: photoType;
  logout: () => actionType;
};

const PhotoCard = ({
  photo,
  logout,
}: photoCardPropsType) => {
  const { setSelectedPhoto, albumTitle } = useContext<albumCardContextType>(AlbumCardContext);
  const { getAlbums, categories } = useContext<albumContextType>(AlbumContext);

  const send = sendQuery(getAlbums, logout);

  const currentTimeout: any = useRef();
  const titleChange = (newTitle: string) => {
    clearTimeout(currentTimeout.current);

    currentTimeout.current = setTimeout(() => {
      send("put", "/api/photo/title", { newTitle, path: photo.path, albumTitle });
      console.log("Title change");
    }, 2000);
  };

  const deletePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (window.confirm("Törlöd a képet ?"))
      send("delete", `/api/photo/${albumTitle}/${photo.path}`);
  };

  const addCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value)
      send("post", `/api/photo/category`, {
        albumTitle,
        path: photo.path,
        category: e.target.value,
      });
  };

  const removeCategory = (category: string) => {
    if (window.confirm("Törlöd a kategóriát ?"))
      send("delete", `/api/photo/category/${albumTitle}/${photo.path}/${category}`);
  };

  return (
    <div className="PhotoCard">
      <div className="overlay">
        <svg onClick={deletePhoto} viewBox="0 0 448 512">
          <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
        </svg>
        <div className="left">
          <Info
            photo={photo}
            titleChange={titleChange}
            addCategory={addCategory}
            removeCategory={removeCategory}
            categories={categories}
            setSelectedPhoto={setSelectedPhoto}
          />
        </div>
        <div className="right">
          <Info
            photo={photo}
            titleChange={titleChange}
            addCategory={addCategory}
            removeCategory={removeCategory}
            categories={categories}
            setSelectedPhoto={setSelectedPhoto}
          />
        </div>
      </div>
      <img src={`/photos/${photo.path}`} alt="" />
    </div>
  );
};

export default connect(null, { logout })(PhotoCard);
