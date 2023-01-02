import { render, screen, fireEvent } from '@testing-library/react';
import FileSaver from 'file-saver';

import { EXPORTED_FILE_NAME } from '../../constants';
import ExportButton from './index';

jest.mock('file-saver', () => ({ saveAs: jest.fn() }));

const mockProps = {
  imageSize: {
    imageWidth: 1440,
    imageHeight: 1440,
  },
  imageCoordinates: {
    xImageAxis: -240,
    yImageAxis: -480,
  },
  imageSrc: 'src',
  canvasRef: {
    current: document.createElement('canvas'),
  },
};

describe('ExportButton', () => {
  const btnTitle = 'Export';

  it('should render component properly', () => {
    render(<ExportButton {...mockProps} />);

    const buttonElement = screen.getByText(btnTitle);

    expect(buttonElement).toBeVisible();
  });

  it('should render disabled button', () => {
    render(
      <ExportButton
        {...mockProps}
        imageSrc={undefined}
        canvasRef={{ current: null }}
      />
    );
    const buttonElement = screen.getByText(btnTitle);

    expect(buttonElement).toBeVisible();
    expect(buttonElement).toHaveAttribute('disabled');
  });

  it('should call file saver', () => {
    render(<ExportButton {...mockProps} />);

    const buttonElement = screen.getByText(btnTitle);
    fireEvent.click(buttonElement);

    expect(FileSaver.saveAs).toHaveBeenCalledWith(
      new Blob(),
      EXPORTED_FILE_NAME
    );
  });
});
