import { memo } from "react";

import { useFileUpload } from "./hooks/use-file-upload";
import { TestIds } from "./constants";
import { ImageParams } from "../../types";

import "./index.scss";

type UploadImageProps = {
  onImageUpload: (params: ImageParams) => void;
};

const UploadImageButtons = ({
  onImageUpload,
}: UploadImageProps): JSX.Element => {
  const handleFileUpload = useFileUpload(onImageUpload);

  return (
    <>
      <label htmlFor="fileSelector" className="upload-buttons__label">
        Upload Image
      </label>
      <input
        data-testid={TestIds.FileSelector}
        type="file"
        id="fileSelector"
        onChange={handleFileUpload}
      />
      <label htmlFor="descriptionSelector" className="upload-buttons__label">
        Upload Image Description
      </label>
      <input
        data-testid={TestIds.DescriptionSelector}
        type="file"
        id="descriptionSelector"
        onChange={handleFileUpload}
      />
    </>
  );
};

export default memo(UploadImageButtons);
