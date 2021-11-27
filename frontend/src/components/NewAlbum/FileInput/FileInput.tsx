import React, { useRef, useState, useEffect } from "react";
import validateImage from "../../../utils/validateImage";
import "./FileInput.css";

type fileInputProps = {
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileInput({ change }: fileInputProps) {
  const inpRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [info, setInfo] = useState<any[] | null>(null);

  const checkFileInputEmpty = () => {
    if (inpRef.current?.files && !inpRef.current.files[0]) {
      setError("Nincs kiválasztva kép!");
      inpRef.current?.parentElement && (inpRef.current.parentElement.style.border = "2px solid red");
    } else {
      setError("");
      inpRef.current?.parentElement && (inpRef.current.parentElement.style.border = "");
    }
  };

  const localChange = (e: any) => {
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
      inpRef.current?.parentElement && (inpRef.current.parentElement.style.border = "2px solid red");
      inpRef.current && (inpRef.current.value = "");
      change(e);
    } else {
      inpRef.current?.parentElement && (inpRef.current.parentElement.style.border = "");

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
    inpRef.current && inpRef.current.click();
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
