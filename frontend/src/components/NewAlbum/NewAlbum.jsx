import "./NewAlbum.css";
import React, { useState } from "react";
import { connect } from "react-redux";
import { logout } from "./../../actions/authActions";
import FileInput from "./FileInput/FileInput";
import httpClient from "axios";

const NewAlbum = ({ logout }) => {
  const [albumData, setAlbumData] = useState({});

  const formChange = (e) => {
    if (e.target.name !== "photo")
      setAlbumData({ ...albumData, [e.target.name]: e.target.value });
    else setAlbumData({ ...albumData, [e.target.name]: e.target.files });
  };

  const send = async (e) => {
    const formData = new FormData();

    for (const field in albumData) {
      if (field !== "photo") formData.append(`${field}`, albumData[`${field}`]);
      else
        for (const file of albumData[`${field}`]) {
          formData.append(`${field}`, file);
        }
    }

    console.log(albumData);

    for (const [key, value] of formData) {
      console.log("key: ", key);
      console.log("value: ", value);
    }

    try {
      const response = await httpClient.post("/api/upload_photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error);

      if (error?.response?.data?.msg.includes("Authentication error")) logout();
    }
  };

  return (
    <div className="NewAlbum">
      <form action="">
        <input
          type="text"
          name="title"
          placeholder="Cím"
          required
          onChange={formChange}
        />
        <FileInput change={formChange} />
        <button type="button" onClick={send}>
          Send
        </button>
      </form>
    </div>
  );
};

export default connect(null, { logout })(NewAlbum);
