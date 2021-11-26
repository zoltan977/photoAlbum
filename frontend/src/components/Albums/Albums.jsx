import "./Albums.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { logout } from "./../../actions/authActions";
import httpClient from "axios";
import AlbumCard from "./AlbumCard/AlbumCard";
import AlbumContext from "./AlbumContext/AlbumContext";

const Albums = ({ logout }) => {
  const [albums, setAlbums] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const getAlbums = async () => {
    try {
      const response = await httpClient.get("/api/album/albums");

      setAlbums(response.data);
    } catch (error) {
      console.log(error);

      if (error?.response?.data?.msg?.includes("Authentication error"))
        logout();
    }
  };

  const getCategories = async () => {
    try {
      const response = await httpClient.get("/api/photo/categories");
      console.log(response);

      setCategories(response.data);
    } catch (error) {
      console.log(error);

      if (error?.response?.data?.msg?.includes("Authentication error"))
        logout();
    }
  };

  useEffect(() => {
    getCategories();
    getAlbums();
  }, []);

  return (
    <div className="Albums">
      <h1>Albumok</h1>
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
