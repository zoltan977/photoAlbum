import "./PhotoDetails.css";
import { useContext, createRef, useState, useEffect } from "react";
import AlbumCardContext, { albumCardContextType } from "../AlbumCardContext/AlbumCardContext";
import { photoType } from "../../Albums";

export default function PhotoDetails() {
  const { selectedPhoto, setSelectedPhoto, filteredPhotos } =
    useContext<albumCardContextType>(AlbumCardContext);

  const componentRef = createRef<HTMLDivElement>();
  const imageDivRef = createRef<HTMLDivElement>();

  const [imageClass, setImageClass] = useState("image");
  const [prevIndex, setPrevIndex] = useState(0);

  const animate = (out: boolean, nextPrev: boolean) => {
    if (!imageDivRef.current || !componentRef.current) return;

    const imageDiv: HTMLDivElement = imageDivRef.current;
    const imageDivInfo: DOMRect = imageDiv.getBoundingClientRect();
    const clonedImageDiv: any = imageDiv.cloneNode(true);
    const component: HTMLDivElement = componentRef.current;

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

  const prev = (e: React.MouseEvent) => {
    if (!selectedPhoto) return;

    const index: number = filteredPhotos.findIndex(
      (p: photoType) => p.path === selectedPhoto.path
    );
    if (index >= 1) {
      animate(true, false);
      setSelectedPhoto(filteredPhotos[index - 1]);
    }
  };
  const next = (e: React.MouseEvent) => {
    if (!selectedPhoto) return;

    const index = filteredPhotos.findIndex(
      (p: photoType) => p.path === selectedPhoto.path
    );
    if (index <= filteredPhotos.length - 2) {
      animate(true, true);
      setSelectedPhoto(filteredPhotos[index + 1]);
    }
  };

  useEffect(() => {
    if (!selectedPhoto) return;

    let nextPrev = true;
    const index: number = filteredPhotos.findIndex(
      (p: photoType) => p.path === selectedPhoto.path
    );

    if (index > prevIndex) nextPrev = true;
    else nextPrev = false;

    setPrevIndex(index);

    if (imageClass.includes("hide")) animate(false, nextPrev);
  }, [selectedPhoto, filteredPhotos]);

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
        <img src={`/photos/${selectedPhoto?.path}`} alt="" />
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
