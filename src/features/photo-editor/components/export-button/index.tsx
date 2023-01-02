import { useCallback, memo } from 'react';
import { saveAs } from 'file-saver';

import { JSON_MIME_TYPE, EXPORTED_FILE_NAME } from '../../constants';
import { ImageSize, Coordinates } from '../../types';
import { getImageDescription } from './utils/get-image-description';

type ExportButtonProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imageSize: ImageSize;
  imageSrc: string | undefined;
  imageCoordinates: Coordinates;
};

function ExportButton({
  canvasRef,
  imageSize,
  imageSrc,
  imageCoordinates,
}: ExportButtonProps): JSX.Element {
  const isExportButtonDisabled = !canvasRef.current || !imageSrc;

  // The handle for creating and saving an image description
  const handleExport = useCallback(() => {
    if (isExportButtonDisabled) return;

    const imageDescription = getImageDescription({
      imageSrc,
      imageSize,
      imageCoordinates,
    });

    // Creates a file with an image description in JSON format
    const fileToSave = new Blob([JSON.stringify(imageDescription, null, 4)], {
      type: JSON_MIME_TYPE,
    });

    // Saves the file
    saveAs(fileToSave, EXPORTED_FILE_NAME);
  }, [imageCoordinates, imageSize, imageSrc, isExportButtonDisabled]);

  return (
    <button
      type='button'
      onClick={handleExport}
      disabled={isExportButtonDisabled}
    >
      Export
    </button>
  );
}

export default memo(ExportButton);
