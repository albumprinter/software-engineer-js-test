import { useCallback } from 'react';

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants';
import { ImageParams, Coordinates, ImageSize } from '../types';

type RenderImage = (params: ImageParams) => void;
type UseRenderImageParams = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setImageCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>;
  initialCoordinates: React.MutableRefObject<Coordinates>;
  setImageSize: React.Dispatch<React.SetStateAction<ImageSize>>;
};

/**
 * Returns the function for rendering an uploaded image.
 * @param {Object} params - Properties and functions for rendering an image.
 * @param {Object} params.canvasRef - Reference to canvas element.
 * @param {Object} params.initialCoordinates - Initial image coordinates.
 * @param {Function} params.setImageCoordinates - The x-axis and y-axis coordinates state setter.
 * @param {Function} params.setImageSize - An image width and height size state setter.
 * @returns {Function} - Function for rendering an image.
 */
export const useRenderImage = ({
  canvasRef,
  initialCoordinates,
  setImageCoordinates,
  setImageSize,
}: UseRenderImageParams): RenderImage =>
  useCallback<RenderImage>(
    ({
      image,
      xImageAxis,
      yImageAxis,
      isExported = false,
    }: ImageParams): void => {
      if (!canvasRef.current) return;

      const { current: canvas } = canvasRef;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      const { width: imageWidth, height: imageHeight } = image;

      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;

      /**
       * Drawing an image whose size exceeds canvas
       */
      if (imageWidth > CANVAS_WIDTH && imageHeight > CANVAS_HEIGHT) {
        // Centered coordinates in the destination canvas
        const imageCenterWidth = CANVAS_WIDTH / 2 - imageWidth / 2;
        const imageCenterHeight = CANVAS_HEIGHT / 2 - imageHeight / 2;

        /**
         * If an image is exported from the JSON file description than
         * exported coordinates is set otherwise an image is centered
         */
        const xAxis = isExported ? xImageAxis : imageCenterWidth;
        const yAxis = isExported ? yImageAxis : imageCenterHeight;

        // Draw an image onto the canvas
        ctx.drawImage(image, xAxis, yAxis, image.width, image.height);

        // Setting an image coordinates to the local state
        setImageCoordinates({
          xImageAxis: xAxis,
          yImageAxis: yAxis,
        });

        // Setting an image size to the local state
        setImageSize({
          imageWidth,
          imageHeight,
        });

        // Saving centered image coordinates for shift calculations
        initialCoordinates.current.xImageAxis = imageCenterWidth;
        initialCoordinates.current.yImageAxis = imageCenterHeight;

        return;
      }

      /**
       * Drawing an image whose width, size, or both fits into the canvas
       */
      // Max of the width and height ratios
      const scaleFactor = Math.max(
        CANVAS_WIDTH / imageWidth,
        CANVAS_HEIGHT / imageHeight
      );

      // Width and height based of the scale factor
      const scaledImageWidth = imageWidth * scaleFactor;
      const scaledImageHeight = imageHeight * scaleFactor;

      // A centered position coordinates for an image within the canvas
      const scaledXAxis = CANVAS_WIDTH / 2 - scaledImageWidth / 2;
      const scaledYAxis = CANVAS_HEIGHT / 2 - scaledImageHeight / 2;

      /**
       * If an image is exported from the JSON file description than exported
       * coordinates is set otherwise an image coordinates is based on scale factor
       */
      const xAxis = isExported ? xImageAxis : scaledXAxis;
      const yAxis = isExported ? yImageAxis : scaledYAxis;

      // Draw an image onto the canvas
      ctx.drawImage(image, xAxis, yAxis, scaledImageWidth, scaledImageHeight);

      // Setting an image coordinates to the local state
      setImageCoordinates({
        xImageAxis: xAxis,
        yImageAxis: yAxis,
      });

      // Setting an image size to the local state
      setImageSize({
        imageWidth: scaledImageWidth,
        imageHeight: scaledImageHeight,
      });

      // Saving centered image coordinates for shift calculations
      initialCoordinates.current.xImageAxis = scaledXAxis;
      initialCoordinates.current.yImageAxis = scaledYAxis;
    },
    [canvasRef, initialCoordinates, setImageCoordinates, setImageSize]
  );
