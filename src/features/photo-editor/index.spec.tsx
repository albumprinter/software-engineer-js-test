import React from "react";
import { render, fireEvent } from "@testing-library/react";

import PhotoEditor from "./index";
import { ImageParams } from "./types";

const mockRenderImage = jest.fn();
const mockSetState = jest.fn();

jest.mock("./hooks/use-render-image", () => ({
  useRenderImage: () => mockRenderImage,
}));

const mockUploadBtnTitle = "Upload";
const mockImageParams = {
  image: new Image(),
  xImageAxis: 0,
  yImageAxis: 0,
  isExported: false,
};

jest.mock("./components/upload-image-buttons", () => {
  return ({
    onImageUpload,
  }: {
    onImageUpload(imageParams: ImageParams): void;
  }) => (
    <button onClick={() => onImageUpload(mockImageParams)}>
      {mockUploadBtnTitle}
    </button>
  );
});

describe("PhotoEditor", () => {
  it("should render properly", () => {
    const { getByText } = render(<PhotoEditor />);

    expect(getByText("Photo Editor")).toBeVisible();
  });

  it("should invoke image uploading handler", () => {
    jest.spyOn(React, "useState").mockReturnValueOnce([null, mockSetState]);

    const { getByText } = render(<PhotoEditor />);

    fireEvent.click(getByText(mockUploadBtnTitle));

    expect(mockRenderImage).toHaveBeenCalledWith(mockImageParams);
    expect(mockSetState).toHaveBeenCalledWith(mockImageParams.image);
  });
});
