import { render, fireEvent } from '@testing-library/react';

import ShiftButtons from './index';
import { mockShiftButtonsProps } from './mocks';

const mockShiftHandlers = {
  handleMoveLeft: jest.fn(),
  handleMoveRight: jest.fn(),
  handleMoveUp: jest.fn(),
  handleMoveDown: jest.fn(),
};

jest.mock('./hooks/use-shift-handlers', () => ({
  useShiftHandlers: () => mockShiftHandlers,
}));

describe('ShiftButtons', () => {
  const leftBtnTitle = 'Move photo left';
  const upBtnTitle = 'Move photo up';
  const rightBtnTitle = 'Move photo right';
  const downBtnTitle = 'Move photo down';

  it('should render component properly', () => {
    const { getByText } = render(<ShiftButtons {...mockShiftButtonsProps} />);

    [
      getByText(leftBtnTitle),
      getByText(upBtnTitle),
      getByText(rightBtnTitle),
      getByText(downBtnTitle),
    ].forEach((element) => {
      expect(element).toBeVisible();
    });
  });

  it('should handle move buttons click', () => {
    const { getByText } = render(<ShiftButtons {...mockShiftButtonsProps} />);

    [
      {
        element: getByText(leftBtnTitle),
        handler: mockShiftHandlers.handleMoveLeft,
      },
      {
        element: getByText(upBtnTitle),
        handler: mockShiftHandlers.handleMoveUp,
      },
      {
        element: getByText(rightBtnTitle),
        handler: mockShiftHandlers.handleMoveRight,
      },
      {
        element: getByText(downBtnTitle),
        handler: mockShiftHandlers.handleMoveDown,
      },
    ].forEach(({ element, handler }) => {
      fireEvent.click(element);
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
