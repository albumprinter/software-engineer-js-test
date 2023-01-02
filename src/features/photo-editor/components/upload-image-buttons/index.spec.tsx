import { render, fireEvent } from '@testing-library/react';

import { TestIds } from './constants';
import UploadImageButtons from './index';

const mockHandleFileUpload = jest.fn();

jest.mock('./hooks/use-file-upload', () => ({
  useFileUpload: () => mockHandleFileUpload,
}));

const mockProps = {
  onImageUpload: jest.fn(),
};

describe('UploadImageButtons', () => {
  it('should render component properly', () => {
    const { getByText } = render(<UploadImageButtons {...mockProps} />);

    [getByText('Upload Image'), getByText('Upload Image Description')].forEach(
      (element) => {
        expect(element).toBeVisible();
      }
    );
  });

  it('should handle file upload buttons change', () => {
    const { getByTestId } = render(<UploadImageButtons {...mockProps} />);

    [
      getByTestId(TestIds.FileSelector),
      getByTestId(TestIds.DescriptionSelector),
    ].forEach((elements) => {
      fireEvent.change(elements);
    });

    expect(mockHandleFileUpload).toHaveBeenCalledTimes(2);
  });
});
