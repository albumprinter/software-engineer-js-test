import { useCallback, useMemo } from "react";

import { SHIFT_STEP } from "../../../constants";
import { ShiftButtonsProps } from "../types";

type ShiftHandlers = {
  handleMoveLeft: () => void;
  handleMoveRight: () => void;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
};

/**
 * Returns handlers for shift image to left, top, right or bottom.
 * @param {Object} params - Properties and function that set coordinates for shifting an image.
 * @param {HTMLImageElement|undefined} params.image - Rendered image element.
 * @param {Object} params.canvasRef - Reference to canvas element.
 * @param {Object} params.imageCoordinates - The x-axis and y-axis coordinates for placing the top-left corner of an image in the canvas.
 * @param {Function} params.setImageCoordinates - The x-axis and y-axis coordinates state setter.
 * @param {Object} params.initialCoordinates - Initial image coordinates.
 * @returns {Object} - Object with handlers for shifting an image.
 */
export const useShiftHandlers = ({
  image,
  canvasRef,
  imageSize,
  imageCoordinates,
  setImageCoordinates,
  initialCoordinates,
}: ShiftButtonsProps): ShiftHandlers => {
  const canvas = canvasRef?.current;
  const ctx = canvas?.getContext("2d");

  const { xImageAxis, yImageAxis } = imageCoordinates;
  const { imageWidth, imageHeight } = imageSize;

  const {
    current: { xImageAxis: initXImageAxis, yImageAxis: initYImageAxis },
  } = initialCoordinates;

  const imageMaxXAxisOffset = initXImageAxis * 2;
  const imageMaxYAxisOffset = initYImageAxis * 2;

  const isImageSet = image && ctx;

  /**
   * Handles moving the image to the left on a constant step per each button click.
   * @returns {void}
   */
  const handleMoveLeft = useCallback(() => {
    if (!isImageSet || xImageAxis === imageMaxXAxisOffset) {
      return;
    }

    // The constant for checking if the image is shifted to the left edge
    const shiftCoordinate = imageMaxXAxisOffset - xImageAxis + SHIFT_STEP;

    /**
     * If the image is shifted to the left edge then the offset
     * is maximal otherwise it shift on constant step
     */
    const leftXAxisCoordinate =
      shiftCoordinate >= 0 ? imageMaxXAxisOffset : xImageAxis - SHIFT_STEP;

    // Redrawing an image after a shift
    ctx.drawImage(
      image,
      leftXAxisCoordinate,
      yImageAxis,
      imageWidth,
      imageHeight
    );

    // Setting new x-axis coordinate to the local state
    setImageCoordinates((prevState) => ({
      ...prevState,
      xImageAxis: leftXAxisCoordinate,
    }));
  }, [
    ctx,
    image,
    imageHeight,
    imageMaxXAxisOffset,
    imageWidth,
    isImageSet,
    setImageCoordinates,
    xImageAxis,
    yImageAxis,
  ]);

  /**
   * Handles moving the image to the right on a constant step per each button click.
   * @returns {void}
   */
  const handleMoveRight = useCallback(() => {
    if (!isImageSet || xImageAxis === 0) {
      return;
    }

    // X-axis image coordinate after a shift
    const shiftCoordinate = xImageAxis + SHIFT_STEP;

    /**
     * If the image is shifted to the right edge then the offset
     * is equal to 0 otherwise it shift on constant step
     */
    const rightXAxisOffset = shiftCoordinate < 0 ? shiftCoordinate : 0;

    // Redrawing an image after a shift
    ctx.drawImage(image, rightXAxisOffset, yImageAxis, imageWidth, imageHeight);

    // Setting new x-axis coordinate to the local state
    setImageCoordinates((prevState) => ({
      ...prevState,
      xImageAxis: rightXAxisOffset,
    }));
  }, [
    ctx,
    image,
    imageHeight,
    imageWidth,
    isImageSet,
    setImageCoordinates,
    xImageAxis,
    yImageAxis,
  ]);

  /**
   * Handles moving the image to the down on a constant step per each button click.
   * @returns {void}
   */
  const handleMoveDown = useCallback(() => {
    if (!isImageSet || yImageAxis === imageMaxYAxisOffset) {
      return;
    }

    // The constant for checking if the image is shifted to the bottom edge
    const shiftCoordinate = imageMaxYAxisOffset - yImageAxis + SHIFT_STEP;

    /**
     * If the image is shifted to the bottom edge then the offset
     * is maximal otherwise it shift on constant step
     */
    const bottomYAxisOffset =
      shiftCoordinate >= 0 ? imageMaxYAxisOffset : yImageAxis - SHIFT_STEP;

    // Redrawing an image after a shift
    ctx.drawImage(
      image,
      xImageAxis,
      bottomYAxisOffset,
      imageWidth,
      imageHeight
    );

    // Setting new y-axis coordinate to the local state
    setImageCoordinates((prevState) => ({
      ...prevState,
      yImageAxis: bottomYAxisOffset,
    }));
  }, [
    ctx,
    image,
    imageHeight,
    imageMaxYAxisOffset,
    imageWidth,
    isImageSet,
    setImageCoordinates,
    xImageAxis,
    yImageAxis,
  ]);

  /**
   * Handles moving the image to the up on a constant step per each button click.
   * @returns {void}
   */
  const handleMoveUp = useCallback(() => {
    if (!isImageSet || yImageAxis === 0) {
      return;
    }

    // Y-axis image coordinate after a shift
    const shiftCoordinate = yImageAxis + SHIFT_STEP;

    /**
     * If the image is shifted to the top edge then the offset
     * is equal to 0 otherwise it shift on constant step
     */
    const topYAxisOffset = shiftCoordinate < 0 ? shiftCoordinate : 0;

    // Redrawing an image after a shift
    ctx.drawImage(image, xImageAxis, topYAxisOffset, imageWidth, imageHeight);

    // Setting new y-axis coordinate to the local state
    setImageCoordinates((prevState) => ({
      ...prevState,
      yImageAxis: topYAxisOffset,
    }));
  }, [
    ctx,
    image,
    imageHeight,
    imageWidth,
    isImageSet,
    setImageCoordinates,
    xImageAxis,
    yImageAxis,
  ]);

  return useMemo<ShiftHandlers>(
    () => ({
      handleMoveLeft,
      handleMoveRight,
      handleMoveUp,
      handleMoveDown,
    }),
    [handleMoveDown, handleMoveLeft, handleMoveRight, handleMoveUp]
  );
};
