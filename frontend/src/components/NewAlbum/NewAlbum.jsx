import "./NewAlbum.css";
import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { logout } from "./../../actions/authActions";
import FileInput from "./FileInput/FileInput";
import httpClient from "axios";
import { Link } from "react-router-dom";

const NewAlbum = ({ logout }) => {
  const form = useRef();

  const [albumData, setAlbumData] = useState({});
  const [errors, setErrors] = useState([]);
  const [formValid, setFormValid] = useState(false);
  const [info, setInfo] = useState("");

  const formChange = (e) => {
    setErrors([]);
    setInfo("");
    setFormValid(form.current.checkValidity());

    if (e.target.name !== "photo")
      setAlbumData({ ...albumData, [e.target.name]: e.target.value });
    else setAlbumData({ ...albumData, [e.target.name]: e.target.files });
  };

  const send = async (e) => {
    setErrors([]);
    setInfo("");

    const formData = new FormData();

    for (const field in albumData) {
      if (field !== "photo") formData.append(`${field}`, albumData[`${field}`]);
      else
        for (const file of albumData[`${field}`]) {
          formData.append(`${field}`, file);
        }
    }

    try {
      const response = await httpClient.post("/api/upload_photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success)
        setInfo("Az új album és/vagy kép(ek) hozzáadva!");
    } catch (error) {
      if (error?.response?.data?.errors) setErrors(error.response.data.errors);

      if (error?.response?.data?.msg?.includes("Authentication error"))
        logout();
    }
  };

  return (
    <div className="NewAlbum">
      <h1>Új album</h1>
      {errors.length
        ? errors.map((e, i) => (
            <p className="error" key={i}>
              {e.msg}
            </p>
          ))
        : null}
      <form ref={form} action="">
        <input
          type="text"
          name="title"
          placeholder="Cím"
          required
          onChange={formChange}
        />
        <FileInput change={formChange} />
        <button disabled={!formValid} type="button" onClick={send}>
          Send
        </button>
        {info && (
          <div>
            <p className="info">{info}</p>
            <Link to="albums">albums</Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default connect(null, { logout })(NewAlbum);
