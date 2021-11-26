import React, { useRef, useState, useEffect } from "react";
import validateImage from "../../../utils/validateImage";
import "./FileInput.css";

export default function FileInput({ change }) {
  const inpRef = useRef();
  const [error, setError] = useState("");
  const [info, setInfo] = useState(null);

  const checkFileInputEmpty = () => {
    if (!inpRef.current.files[0]) {
      setError("Nincs kiválasztva kép!");
      inpRef.current.parentElement.style.border = "2px solid red";
    } else {
      setError("");
      inpRef.current.parentElement.style = "";
    }
  };

  const localChange = (e) => {
    if (!e.target?.files[0]) return;

    setError("");
    setInfo(null);

    checkFileInputEmpty();

    let valid = true;
    for (const file of e.target.files) {
      if (!validateImage(file)) {
        valid = false;
        break;
      }
    }
    if (!valid) {
      setError("Valamelyik kép mérete vagy típusa nem megfelelő!");
      inpRef.current.parentElement.style.border = "2px solid red";
      inpRef.current.value = "";
      change(e);
    } else {
      inpRef.current.parentElement.style = "";

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

  useEffect(() => {
    checkFileInputEmpty();
  }, []);

  return (
    <div className="FileInput">
      <button type="button" onClick={click}>
        <input
          name="photo"
          type="file"
          ref={inpRef}
          onChange={localChange}
          multiple
          required
        />
        Új fénykép
      </button>
      {error && <p className="error">{error}</p>}
      {info && info}
    </div>
  );
}
