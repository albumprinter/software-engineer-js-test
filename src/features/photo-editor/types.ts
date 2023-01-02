export type Coordinates = {
  xImageAxis: number;
  yImageAxis: number;
};

export type ImageSize = {
  imageWidth: number;
  imageHeight: number;
};

export type ImageParams = {
  image: HTMLImageElement;
  xImageAxis: number;
  yImageAxis: number;
  isExported?: boolean;
};

export type UploadedImageDescription = {
  canvas: {
    width: number;
    height: number;
    photo: {
      src: string;
      width: number;
      height: number;
      x: number;
      y: number;
    };
  };
};
