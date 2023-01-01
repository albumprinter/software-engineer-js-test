import { ShiftButtonsProps } from "./types";

export const mockShiftButtonsProps: ShiftButtonsProps = {
  image: new Image(),
  setImageCoordinates: jest.fn(),
  canvasRef: {
    current: document.createElement("canvas"),
  },
  imageSize: {
    imageWidth: 1440,
    imageHeight: 960,
  },
  imageCoordinates: {
    xImageAxis: -240,
    yImageAxis: -480,
  },
  initialCoordinates: {
    current: {
      xImageAxis: -280,
      yImageAxis: -280,
    },
  },
};
