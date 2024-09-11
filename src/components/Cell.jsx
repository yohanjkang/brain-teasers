import React, { useState, useContext, useEffect } from "react";
import GridSettingsContext from "./GridSettingsContext";

const Cell = ({ partOfAnswer, answer }) => {
  const [selected, setSelected] = useState(false);

  const { solved, onCorrectCellSelected, onIncorrectCellSelected } =
    useContext(GridSettingsContext);

  const cellClassname = "w-full h-full bg-blue-600";
  const solvedCellClassname = "w-full h-full bg-green-500";

  const onMouseDownEvent = () => {
    setSelected(!selected);

    if (partOfAnswer) {
      onCorrectCellSelected(!selected);
    } else {
      onIncorrectCellSelected(!selected);
    }
  };

  useEffect(() => {
    setSelected(false);
  }, [answer]);

  useEffect(() => {
    if (solved) {
      setSelected(partOfAnswer);
    }
  }, [partOfAnswer, solved]);

  return (
    <div
      className="flex justify-center items-center w-16 h-16 border-gray-300 border-2 cursor-pointer"
      onMouseDown={() => onMouseDownEvent()}
    >
      {selected && (
        <div className={solved ? solvedCellClassname : cellClassname}></div>
      )}
    </div>
  );
};

export default Cell;
