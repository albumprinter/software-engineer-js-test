import { fitImagesToCanvas } from "../src/canvas";

describe("fitImagesToCanvas", () => {
  it("should match images area with canvas area", () => {
    const images = [
      { width: 60, height: 50 },
      { width: 400, height: 500 },
      { width: 300, height: 500 },
      { width: 1400, height: 1000 }
    ];
    const canvas = { width: 1000, height: 1000 };
    
    const canvasArea = canvas.width * canvas.height;
    const scaledImages = fitImagesToCanvas(canvas, images);
    const imagesArea = scaledImages.reduce((subTotal, image) => {
      const total = subTotal + (image.width * image.height);
      return total;
    }, 0);

    expect(canvasArea >= imagesArea).toBe(true);
  })
})