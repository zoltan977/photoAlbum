import "./AlbumCard.css";
import React, { useState, useContext, useEffect, useRef } from "react";
import PhotoCard from "./PhotoCard/PhotoCard";
import PhotoDetails from "./PhotoDetails/PhotoDetails";
import AlbumCardContext from "./AlbumCardContext/AlbumCardContext";
import AlbumContext, { albumContextType } from "../AlbumContext/AlbumContext";
import { connect } from "react-redux";
import { actionType, logout } from "../../../actions/authActions";
import ContentEditable from "../../ContentEditable/ContentEditable";
import sendQuery from "../../../utils/modifyApiData";
import { photoType } from "../Albums";

type albumCardProps = {
  logout: () => actionType;
  title: string;
  date: Date;
  photos: photoType[];
};

const AlbumCard: React.FC<albumCardProps> = ({
  title,
  date,
  photos,
  logout,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<photoType | null>(null);
  const [filteredPhotos, setFilteredPhotos] = useState<photoType[]>(photos);
  const { getAlbums, selectedCategory } =
    useContext<albumContextType>(AlbumContext);

  const send = sendQuery(getAlbums, logout);

  const deleteAlbum = (e: React.MouseEvent) => {
    if (window.confirm("Törlöd az albumot ?"))
      send("delete", `/api/album/${title}`);
  };

  const currentTimeout = useRef<any>();
  const titleChange = (value: string) => {
    clearTimeout(currentTimeout.current);

    currentTimeout.current = setTimeout(() => {
      send("put", "/api/album/title", { newTitle: value, title });
      console.log("Title change");
    }, 2000);
  };

  useEffect(() => {
    const filtered: photoType[] = photos.filter(
      (p: photoType) => p.categories.includes(selectedCategory) || !selectedCategory
    );

    setFilteredPhotos(filtered);
  }, [selectedCategory, photos]);

  return (
    <div className="AlbumCard">
      <AlbumCardContext.Provider
        value={{
          selectedPhoto,
          setSelectedPhoto,
          filteredPhotos,
          albumTitle: title,
        }}
      >
        {selectedPhoto && <PhotoDetails />}
        <svg onClick={deleteAlbum} viewBox="0 0 448 512">
          <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
        </svg>

        <div className="info">
          <ContentEditable onChange={titleChange}>
            <h2 className="title">{title}</h2>
          </ContentEditable>
          <p className="date">{new Date(date).toLocaleDateString()}</p>
        </div>
        <div className="content">
          {filteredPhotos.length ? (
            filteredPhotos.map((p: photoType, i: number) => (
              <PhotoCard
                key={i}
                photo={p}
              />
            ))
          ) : (
            <p className="warning">Nincs kép a választott kategóriában!</p>
          )}
        </div>
      </AlbumCardContext.Provider>
    </div>
  );
};

export default connect(null, { logout })(AlbumCard);
