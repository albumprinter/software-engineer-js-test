import {
  PIXELS_PER_INCH,
  IMAGE_HEIGHT_IN_INCHES,
  IMAGE_WIDTH_IN_INCHES,
} from '../../../constants';
import { getImageDescription } from './get-image-description';

const imageSrc = 'src';
const imageWidth = 1440;
const imageHeight = 960;
const xImageAxis = -240;
const yImageAxis = -480;

const mockParams = {
  imageSize: {
    imageWidth,
    imageHeight,
  },
  imageCoordinates: {
    xImageAxis,
    yImageAxis,
  },
  imageSrc,
};

describe('getImageDescription', () => {
  it('should return image description object', () => {
    const imageDescription = getImageDescription(mockParams);

    expect(imageDescription).toHaveProperty('canvas.photo.src', imageSrc);
    expect(imageDescription).toHaveProperty(
      'canvas.width',
      IMAGE_WIDTH_IN_INCHES
    );
    expect(imageDescription).toHaveProperty(
      'canvas.height',
      IMAGE_HEIGHT_IN_INCHES
    );
    expect(imageDescription).toHaveProperty(
      'canvas.photo.width',
      imageWidth / PIXELS_PER_INCH
    );
    expect(imageDescription).toHaveProperty(
      'canvas.photo.height',
      imageHeight / PIXELS_PER_INCH
    );
    expect(imageDescription).toHaveProperty(
      'canvas.photo.x',
      xImageAxis / PIXELS_PER_INCH
    );
    expect(imageDescription).toHaveProperty(
      'canvas.photo.y',
      yImageAxis / PIXELS_PER_INCH
    );
  });
});
