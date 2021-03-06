import "./NewAlbum.css";
import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { actionType, logout } from "./../../actions/authActions";
import FileInput from "./FileInput/FileInput";
import httpClient from "axios";
import { Link } from "react-router-dom";
import AutoSearch from "./AutoSearch/AutoSearch";

type newAlbumProps = {
  logout: () => actionType;
};

const NewAlbum = ({ logout }: newAlbumProps) => {
  const form = useRef<HTMLFormElement>(null);

  const [albumData, setAlbumData] = useState<any>({});
  const [errors, setErrors] = useState([]);
  const [formValid, setFormValid] = useState<boolean | undefined>(false);
  const [info, setInfo] = useState("");
  const [albums, setAlbums] = useState<any[]>([]);
  const [filteredAlbumTitles, setFilteredAlbumTitles] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  const formChange = (e: any) => {
    setErrors([]);
    setInfo("");
    setFormValid(form?.current?.checkValidity());

    if (e.target.name !== "photo")
      setAlbumData({ ...albumData, [e.target.name]: e.target.value });
    else setAlbumData({ ...albumData, [e.target.name]: e.target.files });
  };

  const showAlbums = (value: string) => {
    const filtered = albums
      .map((a) => a.title)
      .filter((at) => at.includes(value));

    setFilteredAlbumTitles(filtered);
  };

  const send = async (e: React.MouseEvent) => {
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
      const response = await httpClient.post("/api/photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success) {
        setInfo("Az új album és/vagy kép(ek) hozzáadva!");
        getAlbums();
      }
    } catch (error: any) {
      if (error?.response?.data?.errors) setErrors(error.response.data.errors);

      if (error?.response?.data?.msg?.includes("Authentication error"))
        logout();
    }
  };

  const getAlbums = async () => {
    try {
      const response = await httpClient.get("/api/album/albums");

      setAlbums(response.data);
    } catch (error: any) {
      console.log(error);

      if (error?.response?.data?.msg?.includes("Authentication error"))
        logout();
    }
  };

  const settingOfShowSearch = (value: boolean) => {
    setTimeout(() => setShowSearch(value), 200);
  };

  useEffect(() => {
    getAlbums();
  }, []);

  useEffect(() => {
    showAlbums("");
  }, [albums]);

  return (
    <div className="NewAlbum">
      <h1>Új album</h1>
      {errors.length
        ? errors.map((e: any, i: number) => (
            <p className="error" key={i}>
              {e.msg}
            </p>
          ))
        : null}
      <form ref={form} action="">
        <div className="titleDiv">
          <input
            type="text"
            name="title"
            placeholder="Cím"
            required
            value={albumData.title || ""}
            onBlur={(e) => settingOfShowSearch(false)}
            onFocus={(e) => settingOfShowSearch(true)}
            onChange={(e) => {
              formChange(e);
              showAlbums(e.target.value);
            }}
          />
          {showSearch && filteredAlbumTitles.length ? (
            <AutoSearch
              filteredAlbumTitles={filteredAlbumTitles}
              formChange={formChange}
            />
          ) : null}
        </div>
        <FileInput change={formChange} />
        <button disabled={!formValid} type="button" onClick={send}>
          Send
        </button>
        {info && (
          <div>
            <p className="info">{info}</p>
            <Link to="/albums">albums</Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default connect(null, { logout })(NewAlbum);
