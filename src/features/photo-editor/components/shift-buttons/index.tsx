import { memo } from 'react';

import { useShiftHandlers } from './hooks/use-shift-handlers';
import { ShiftButtonsProps } from './types';

import './index.scss';

function ShiftButtons(props: ShiftButtonsProps): JSX.Element {
  const { handleMoveLeft, handleMoveRight, handleMoveUp, handleMoveDown } =
    useShiftHandlers(props);

  return (
    <div className='shift-buttons'>
      <button type='button' onClick={handleMoveLeft}>
        Move photo left
      </button>
      <button type='button' onClick={handleMoveUp}>
        Move photo up
      </button>
      <button type='button' onClick={handleMoveRight}>
        Move photo right
      </button>
      <button type='button' onClick={handleMoveDown}>
        Move photo down
      </button>
    </div>
  );
}

export default memo(ShiftButtons);
