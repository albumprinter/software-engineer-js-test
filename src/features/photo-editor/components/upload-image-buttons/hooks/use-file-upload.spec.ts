import { renderHook, act } from "@testing-library/react-hooks";
import "jest-canvas-mock";
import { useFileUpload } from "./use-file-upload";
import {
  PIXELS_PER_INCH,
  IMAGE_JPEG_MIME_TYPE,
  JSON_MIME_TYPE,
} from "../../../constants";

const mockOnImageUpload = jest.fn();

const mockImage = {
  src: "",
  onload: jest.fn(),
};

const mockFileReader = {
  readAsDataURL: jest.fn(),
  readAsText: jest.fn(),
  onload: jest.fn(),
  result: "result",
};

describe("useShiftHandlers", () => {
  beforeEach(() => {
    jest
      .spyOn(global, "Image")
      .mockReturnValue(mockImage as unknown as HTMLImageElement);
    jest
      .spyOn(global, "FileReader")
      .mockReturnValue(mockFileReader as unknown as FileReader);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return file upload handler", () => {
    const {
      result: { current },
    } = renderHook(() => useFileUpload(mockOnImageUpload));

    expect(typeof current).toBe("function");
  });

  it("should handle image file uploading", () => {
    const mockImageFile = {
      type: IMAGE_JPEG_MIME_TYPE,
    };

    const {
      result: { current: handleFileUpload },
    } = renderHook(() => useFileUpload(mockOnImageUpload));

    act(() => {
      handleFileUpload({
        target: {
          files: [mockImageFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(mockImageFile);

    mockFileReader.onload();
    mockImage.onload();

    expect(mockImage.src).toBe(mockFileReader.result);
    expect(mockOnImageUpload).toBeCalledWith({
      image: mockImage,
      xImageAxis: 0,
      yImageAxis: 0,
    });
  });

  it("should handle JSON file uploading", () => {
    const mockJSONFile = {
      type: JSON_MIME_TYPE,
    };

    const mockPhotoDescription = {
      src: "src",
      x: 0,
      y: 0,
    };

    const {
      result: { current: handleFileUpload },
    } = renderHook(() => useFileUpload(mockOnImageUpload));

    act(() => {
      handleFileUpload({
        target: {
          files: [mockJSONFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    expect(mockFileReader.readAsText).toHaveBeenCalledWith(mockJSONFile);

    mockFileReader.onload({
      target: {
        result: JSON.stringify({
          canvas: {
            photo: mockPhotoDescription,
          },
        }),
      },
    });

    mockImage.onload();

    expect(mockImage.src).toBe(mockPhotoDescription.src);
    expect(mockOnImageUpload).toBeCalledWith({
      image: mockImage,
      xImageAxis: mockPhotoDescription.x * PIXELS_PER_INCH,
      yImageAxis: mockPhotoDescription.y * PIXELS_PER_INCH,
      isExported: true,
    });
  });
});
