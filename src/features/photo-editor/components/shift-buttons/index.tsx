import { memo } from "react";

import { useShiftHandlers } from "./hooks/use-shift-handlers";
import { ShiftButtonsProps } from "./types";

import "./index.scss";

const ShiftButtons = (props: ShiftButtonsProps): JSX.Element => {
  const { handleMoveLeft, handleMoveRight, handleMoveUp, handleMoveDown } =
    useShiftHandlers(props);

  return (
    <div className="shift-buttons">
      <button onClick={handleMoveLeft}>Move photo left</button>
      <button onClick={handleMoveUp}>Move photo up</button>
      <button onClick={handleMoveRight}>Move photo right</button>
      <button onClick={handleMoveDown}>Move photo down</button>
    </div>
  );
};

export default memo(ShiftButtons);
