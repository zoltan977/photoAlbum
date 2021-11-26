import React, { useRef, useState } from "react";
import validateImage from "../../../utils/validateImage";
import "./FileInput.css";

export default function FileInput({ change }) {
  const inpRef = useRef();
  const [error, setError] = useState("");
  const [info, setInfo] = useState(null);

  const localChange = (e) => {
    setError("");
    setInfo(null);

    if (!e.target?.files[0]) return;

    let valid = true;
    for (const file of e.target.files) {
      if (!validateImage(file)) {
        valid = false;
        break;
      }
    }
    if (!valid) setError("Valamelyik kép mérete vagy típusa nem megfelelő!");
    else {
      const inf = [];
      let i = 0;
      for (const file of e.target.files) {
        inf.push(
          <p key={i++} className="info">
            {file.name}
          </p>
        );
      }
      setInfo(inf);
      change(e);
    }
  };

  const click = () => {
    inpRef.current.click();
  };

  return (
    <div className="FileInput">
      <button type="button" onClick={click}>
        <input
          name="photo"
          type="file"
          ref={inpRef}
          onChange={localChange}
          multiple
        />
        Új fénykép
      </button>
      {error && <p className="error">{error}</p>}
      {info && info}
    </div>
  );
}
