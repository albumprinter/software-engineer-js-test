import { renderHook, act } from '@testing-library/react-hooks';
import { useRenderImage } from './use-render-image';
import 'jest-canvas-mock';

const canvasElement = document.createElement('canvas');
const ctx = canvasElement?.getContext('2d');

const mockProps = {
  canvasRef: {
    current: canvasElement,
  },
  initialCoordinates: {
    current: { xImageAxis: 0, yImageAxis: 0 },
  },
  setImageCoordinates: jest.fn(),
  setImageSize: jest.fn(),
};

describe('useRenderImage', () => {
  it('should return handler for rendering an image', () => {
    const {
      result: { current: renderImage },
    } = renderHook(() => useRenderImage(mockProps));

    expect(typeof renderImage).toBe('function');
  });

  it('should not draw an image as canvas reference is null', () => {
    const renderImageProps = {
      image: new Image(320, 320),
      xImageAxis: 0,
      yImageAxis: 0,
      isExported: false,
    };

    const {
      result: { current: renderImage },
    } = renderHook(() =>
      useRenderImage({
        ...mockProps,
        canvasRef: {
          current: null,
        },
      })
    );

    act(() => {
      renderImage(renderImageProps);
    });

    const calls = ctx?.__getDrawCalls();

    expect(calls).toHaveLength(0);
  });

  it('should draw an image whose width, size, or both fits into the canvas', () => {
    const renderImageProps = {
      image: new Image(320, 320),
      xImageAxis: 0,
      yImageAxis: 0,
      isExported: false,
    };

    const {
      result: { current: renderImage },
    } = renderHook(() => useRenderImage(mockProps));

    act(() => {
      renderImage(renderImageProps);
    });

    const calls = ctx?.__getDrawCalls();

    expect(calls).toMatchSnapshot();
  });

  it('should draw an exported image which width, size or both fits into canvas', () => {
    const renderImageProps = {
      image: new Image(320, 320),
      xImageAxis: -48,
      yImageAxis: -48,
      isExported: true,
    };

    const {
      result: { current: renderImage },
    } = renderHook(() => useRenderImage(mockProps));

    act(() => {
      renderImage(renderImageProps);
    });

    const calls = ctx?.__getDrawCalls();

    expect(calls).toMatchSnapshot();
  });

  it('should draw an image whose size exceeds canvas', () => {
    const renderImageProps = {
      image: new Image(3024, 4032),
      xImageAxis: 0,
      yImageAxis: 0,
      isExported: false,
    };

    const {
      result: { current: renderImage },
    } = renderHook(() => useRenderImage(mockProps));

    act(() => {
      renderImage(renderImageProps);
    });

    const calls = ctx?.__getDrawCalls();

    expect(calls).toMatchSnapshot();
  });

  it('should draw an exported image which size exceeds canvas', () => {
    const renderImageProps = {
      image: new Image(3024, 4032),
      xImageAxis: -48,
      yImageAxis: -48,
      isExported: false,
    };

    const {
      result: { current: renderImage },
    } = renderHook(() => useRenderImage(mockProps));

    act(() => {
      renderImage(renderImageProps);
    });

    const calls = ctx?.__getDrawCalls();

    expect(calls).toMatchSnapshot();
  });
});
