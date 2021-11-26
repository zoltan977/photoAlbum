import "./Albums.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { logout } from "./../../actions/authActions";
import AlbumCard from "./AlbumCard/AlbumCard";
import AlbumContext from "./AlbumContext/AlbumContext";
import getApiData from "../../utils/getApiData";

const Albums = ({ logout }) => {
  const [albums, setAlbums] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const getData = getApiData(logout);

  const getAlbums = () => {
    getData("/api/album/albums", setAlbums);
  };

  const getCategories = () => {
    getData("/api/photo/categories", setCategories);
  };

  useEffect(() => {
    getCategories();
    getAlbums();
  }, []);

  return (
    <div className="Albums">
      <h1>Albumok</h1>
      <div className="categories">
        Kategóriák:
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option key={0} value="">
            none
          </option>
          {categories.map((c, i) => (
            <option key={i + 1} value={c.title}>
              {c.title}
            </option>
          ))}
        </select>
      </div>
      <AlbumContext.Provider
        value={{
          getAlbums,
          selectedCategory,
          categories,
        }}
      >
        {albums.length ? (
          albums.map((a, i) => (
            <AlbumCard
              key={i}
              title={a.title}
              date={a.date}
              photos={a.photos}
            />
          ))
        ) : (
          <p>Nincsenek albumok</p>
        )}
      </AlbumContext.Provider>
    </div>
  );
};

export default connect(null, { logout })(Albums);
