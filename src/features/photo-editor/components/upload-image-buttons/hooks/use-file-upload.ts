import { useCallback } from 'react';

import {
  ALLOWED_IMAGE_MIME_TYPES,
  JSON_MIME_TYPE,
  PIXELS_PER_INCH,
} from '../../../constants';
import { ImageParams, UploadedImageDescription } from '../../../types';

type OnImageUpload = (params: ImageParams) => void;
type HandleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => void;

/**
 * Returns handler for file upload.
 * @param {Function} onImageUpload - A callback function for rendering an image.
 * @returns {Function} - Function for handle file upload.
 */
export const useFileUpload = (onImageUpload: OnImageUpload): HandleFileUpload =>
  useCallback<HandleFileUpload>(
    (event) => {
      const {
        target: { files },
      } = event;

      if (!files) return;

      const file = files[0];
      const { type: fileType } = file;

      const isImageType = ALLOWED_IMAGE_MIME_TYPES.includes(fileType);
      const isJsonType = fileType === JSON_MIME_TYPE;

      // Crete an element for holding image data
      const image = new Image();

      // Create a reader for reading the content of files
      const reader = new FileReader();

      if (isImageType) {
        reader.onload = () => {
          image.src = reader.result as string;
          image.onload = () => {
            // When an image is loaded invokes the function for rendering
            onImageUpload({ image, xImageAxis: 0, yImageAxis: 0 });
          };
        };

        reader.readAsDataURL(file);

        return;
      }

      if (isJsonType) {
        // Read the JSON file with image description
        reader.readAsText(file);
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const { target } = e;

          if (!target?.result) return;

          // Parse loaded JSON file
          const imageDescription: UploadedImageDescription = JSON.parse(
            target.result as string
          );

          const {
            canvas: {
              photo: { src, x, y },
            },
          } = imageDescription;

          // Convert inches into pixels
          const xImageAxis = x * PIXELS_PER_INCH;
          const yImageAxis = y * PIXELS_PER_INCH;

          // Set an image source from the loaded JSON file
          image.src = src;
          image.onload = () => {
            // When an image is loaded invokes the function for rendering
            onImageUpload({
              image,
              xImageAxis,
              yImageAxis,
              isExported: true,
            });
          };
        };
      }
    },
    [onImageUpload]
  );
