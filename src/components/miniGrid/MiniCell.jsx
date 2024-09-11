import React, { forwardRef, useImperativeHandle, useState } from "react";
import GridSettingsContext from "../GridSettingsContext";

const MiniCell = forwardRef((_, ref) => {
  const [selected, setSelected] = useState(false);

  const { solved } = GridSettingsContext;

  const cellClassname = "w-full h-full bg-white";
  const solvedCellClassname = "w-full h-full bg-green-500";

  useImperativeHandle(ref, () => ({
    setSelectedState: (isSelected) => setSelected(isSelected),
  }));

  return (
    <div className="flex justify-center items-center w-16 h-16 cursor-pointer">
      {selected && (
        <div className={solved ? solvedCellClassname : cellClassname}></div>
      )}
    </div>
  );
});

export default MiniCell;
