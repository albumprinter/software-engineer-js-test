import { renderHook, act } from "@testing-library/react-hooks";
import "jest-canvas-mock";

import { useShiftHandlers } from "./use-shift-handlers";
import { mockShiftButtonsProps } from "../mocks";

describe("useShiftHandlers", () => {
  const ctx = mockShiftButtonsProps.canvasRef.current?.getContext("2d");

  it("should define handlers", () => {
    const {
      result: { current: handlers },
    } = renderHook(() => useShiftHandlers(mockShiftButtonsProps));

    expect(handlers).toBeDefined();
  });

  it("should shift an image to the left", () => {
    const {
      result: {
        current: { handleMoveLeft },
      },
    } = renderHook(() => useShiftHandlers(mockShiftButtonsProps));

    act(() => {
      handleMoveLeft();
    });

    const calls = ctx?.__getDrawCalls();

    expect(calls).toMatchSnapshot();
  });

  it("should shift an image to the right", () => {
    const {
      result: {
        current: { handleMoveRight },
      },
    } = renderHook(() => useShiftHandlers(mockShiftButtonsProps));

    act(() => {
      handleMoveRight();
    });

    const calls = ctx?.__getDrawCalls();

    expect(calls).toMatchSnapshot();
  });

  it("should shift an image to the top", () => {
    const {
      result: {
        current: { handleMoveUp },
      },
    } = renderHook(() => useShiftHandlers(mockShiftButtonsProps));

    act(() => {
      handleMoveUp();
    });

    const calls = ctx?.__getDrawCalls();

    expect(calls).toMatchSnapshot();
  });

  it("should shift an image to the bottom", () => {
    const {
      result: {
        current: { handleMoveDown },
      },
    } = renderHook(() => useShiftHandlers(mockShiftButtonsProps));

    act(() => {
      handleMoveDown();
    });

    const calls = ctx?.__getDrawCalls();

    expect(calls).toMatchSnapshot();
  });
});
