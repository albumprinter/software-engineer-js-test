import { useState, useRef, useCallback } from "react";

import { useRenderImage } from "./hooks/use-render-image";

import ExportButton from "./components/export-button";
import ShiftButtons from "./components/shift-buttons";
import UploadImageButtons from "./components/upload-image-buttons";
import { Coordinates, ImageSize, ImageParams } from "./types";

import "./index.scss";

const PhotoEditor = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<HTMLImageElement>();
  const [imageCoordinates, setImageCoordinates] = useState<Coordinates>({
    xImageAxis: 0,
    yImageAxis: 0,
  });

  const [imageSize, setImageSize] = useState<ImageSize>({
    imageWidth: 0,
    imageHeight: 0,
  });

  const initialCoordinates = useRef<Coordinates>({
    xImageAxis: 0,
    yImageAxis: 0,
  });

  const renderImage = useRenderImage({
    canvasRef,
    initialCoordinates,
    setImageCoordinates,
    setImageSize,
  });

  const handleImageUpload = useCallback(
    (imageParams: ImageParams): void => {
      const { image } = imageParams;

      renderImage(imageParams);
      setImage(image);
    },
    [renderImage]
  );

  return (
    <div className="photo-editor">
      <h1>Photo Editor</h1>
      <div className="photo-editor__transfer-buttons">
        <UploadImageButtons onImageUpload={handleImageUpload} />
        <ExportButton
          canvasRef={canvasRef}
          imageSize={imageSize}
          imageSrc={image?.src}
          imageCoordinates={imageCoordinates}
        />
      </div>
      <canvas ref={canvasRef} />
      <ShiftButtons
        initialCoordinates={initialCoordinates}
        image={image}
        canvasRef={canvasRef}
        imageSize={imageSize}
        imageCoordinates={imageCoordinates}
        setImageCoordinates={setImageCoordinates}
      />
    </div>
  );
};

export default PhotoEditor;
