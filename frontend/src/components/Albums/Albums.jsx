import "./Albums.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { logout } from "./../../actions/authActions";
import httpClient from "axios";
import AlbumCard from "./AlbumCard/AlbumCard";

const Albums = ({ logout }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const asyncFn = async () => {
      try {
        const response = await httpClient.get("/api/albums");

        setAlbums(response.data);
      } catch (error) {
        console.log(error);

        if (error?.response?.data?.msg.includes("Authentication error"))
          logout();
      }
    };

    asyncFn();
  }, []);

  return (
    <div className="Albums">
      {albums.length ? (
        albums.map((a, i) => (
          <AlbumCard key={i} title={a.title} date={a.date} photos={a.photos} />
        ))
      ) : (
        <p>Nincsenek albumok</p>
      )}
    </div>
  );
};

export default connect(null, { logout })(Albums);
