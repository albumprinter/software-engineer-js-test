import { Coordinates, ImageSize } from "../../types";

export type ShiftButtonsProps = {
  initialCoordinates: React.MutableRefObject<Coordinates>;
  image: HTMLImageElement | undefined;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imageSize: ImageSize;
  imageCoordinates: Coordinates;
  setImageCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>;
};
