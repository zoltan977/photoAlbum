import "./PhotoDetails.css";
import React, { useContext, useRef, useState, useEffect } from "react";
import AlbumCardContext from "../AlbumCardContext/AlbumCardContext";

export default function PhotoDetails() {
  const { selectedPhoto, setSelectedPhoto, photos } =
    useContext(AlbumCardContext);

  const componentRef = useRef();
  const imageDivRef = useRef();

  const [imageClass, setImageClass] = useState("image");
  const [prevIndex, setPrevIndex] = useState(0);

  const animate = (out, nextPrev) => {
    if (!imageDivRef.current || !componentRef.current) return;

    const imageDiv = imageDivRef.current;
    const imageDivInfo = imageDiv.getBoundingClientRect();
    const clonedImageDiv = imageDiv.cloneNode(true);
    const component = componentRef.current;

    if (out) setImageClass("image hide");

    component.insertBefore(clonedImageDiv, component.firstElementChild);

    clonedImageDiv.style.position = "fixed";
    clonedImageDiv.style.zIndex = 2;

    if (out) clonedImageDiv.style.left = Math.floor(imageDivInfo.left) + "px";
    else {
      clonedImageDiv.style.visibility = "visible";
      clonedImageDiv.style.left = nextPrev ? "-100%" : "100%";
    }

    clonedImageDiv.style.top = Math.floor(imageDivInfo.top) + "px";
    clonedImageDiv.style.transition = "left 2s";

    setTimeout(() => {
      if (out) clonedImageDiv.style.left = nextPrev ? "100%" : "-100%";
      else clonedImageDiv.style.left = Math.floor(imageDivInfo.left) + "px";
    }, 100);

    setTimeout(() => {
      clonedImageDiv.remove();

      if (!out) setImageClass("image");
    }, 2100);
  };

  const prev = (e) => {
    const index = photos.findIndex((p) => p.path === selectedPhoto.path);
    if (index >= 1) {
      animate(true, false);
      setSelectedPhoto(photos[index - 1]);
    }
  };
  const next = (e) => {
    const index = photos.findIndex((p) => p.path === selectedPhoto.path);
    if (index <= photos.length - 2) {
      animate(true, true);
      setSelectedPhoto(photos[index + 1]);
    }
  };

  useEffect(() => {
    let nextPrev = true;
    const index = photos.findIndex((p) => p.path === selectedPhoto.path);

    if (index > prevIndex) nextPrev = true;
    else nextPrev = false;

    setPrevIndex(index);

    if (imageClass.includes("hide")) animate(false, nextPrev);
  }, [selectedPhoto]);

  return (
    <div className="PhotoDetails" ref={componentRef}>
      <button className="close" onClick={(e) => setSelectedPhoto(null)}>
        X
      </button>
      <button
        disabled={imageClass.includes("hide")}
        onClick={prev}
        type="button"
      >
        &#10094;
      </button>
      <div className={imageClass} ref={imageDivRef}>
        <img src={`/photos/${selectedPhoto.path}`} alt="" />
      </div>
      <button
        disabled={imageClass.includes("hide")}
        onClick={next}
        type="button"
      >
        &#10095;
      </button>
    </div>
  );
}
