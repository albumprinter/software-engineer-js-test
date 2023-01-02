import { memo } from 'react';

import { useFileUpload } from './hooks/use-file-upload';
import { TestIds } from './constants';
import { ImageParams } from '../../types';

import './index.scss';

type UploadImageProps = {
  onImageUpload: (params: ImageParams) => void;
};

function UploadImageButtons({ onImageUpload }: UploadImageProps): JSX.Element {
  const handleFileUpload = useFileUpload(onImageUpload);

  // TODO: Fix styles

  return (
    <>
      <label htmlFor='fileSelector'>
        Upload Image
        <input
          className='upload-buttons__input'
          data-testid={TestIds.FileSelector}
          type='file'
          id='fileSelector'
          onChange={handleFileUpload}
        />
      </label>

      <label htmlFor='descriptionSelector'>
        Upload Image Description
        <input
          className='upload-buttons__input'
          data-testid={TestIds.DescriptionSelector}
          type='file'
          id='descriptionSelector'
          onChange={handleFileUpload}
        />
      </label>
    </>
  );
}

export default memo(UploadImageButtons);
