import {
  PIXELS_PER_INCH,
  IMAGE_HEIGHT_IN_INCHES,
  IMAGE_WIDTH_IN_INCHES,
} from '../../../constants';
import {
  UploadedImageDescription,
  ImageSize,
  Coordinates,
} from '../../../types';

type GetImageDescriptionParams = {
  imageSrc: string;
  imageSize: ImageSize;
  imageCoordinates: Coordinates;
};

/**
 * Returns an image description.
 * @param {Object} params - An image details for creating an image description object.
 * @param {string} params.imageSrc - An image Base64 data.
 * @param {Object} params.imageSize - An image width and height.
 * @param {Object} params.imageCoordinates - The x-axis and y-axis coordinates of the top-left corner of an image in the canvas.
 * @returns {Function} - An image description.
 */
export const getImageDescription = ({
  imageSrc,
  imageSize,
  imageCoordinates,
}: GetImageDescriptionParams): UploadedImageDescription => {
  const { imageWidth, imageHeight } = imageSize;
  const { xImageAxis, yImageAxis } = imageCoordinates;

  return {
    canvas: {
      width: IMAGE_WIDTH_IN_INCHES,
      height: IMAGE_HEIGHT_IN_INCHES,
      photo: {
        src: imageSrc,
        width: imageWidth / PIXELS_PER_INCH,
        height: imageHeight / PIXELS_PER_INCH,
        x: xImageAxis / PIXELS_PER_INCH,
        y: yImageAxis / PIXELS_PER_INCH,
      },
    },
  };
};
