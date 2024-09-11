import React, { useContext } from "react";
import Dropdown from "./ui/Dropdown";
import GridSettingsContext, {
  difficultyOptions,
  gridSizeOptions,
} from "./GridSettingsContext";
import Button from "./ui/Button";

const SettingsPanel = ({ generateNewGrid, solveGrid }) => {
  const { newGridSize, setNewGridSize } = useContext(GridSettingsContext);

  const changeRowSize = (newRowSize) => {
    setNewGridSize({ rows: newRowSize, columns: newGridSize.columns });
  };

  const changeColumnSize = (newColumnSize) => {
    setNewGridSize({ rows: newGridSize.rows, columns: newColumnSize });
  };

  const changeDifficulty = (newDifficulty) => {};

  return (
    <div className="h-full w-20 min-w-[300px] self-end bg-gray-500 text-white">
      {/* Row Dropdown */}
      <Dropdown
        dropdownTitle={newGridSize.rows}
        dropdownItems={gridSizeOptions}
        onDropdownItemChanged={changeRowSize}
      />
      {/* Column Dropdown */}
      <Dropdown
        dropdownTitle={newGridSize.columns}
        dropdownItems={gridSizeOptions}
        onDropdownItemChanged={changeColumnSize}
      />
      {/* Difficulty Dropdown */}
      <Dropdown
        dropdownTitle={"Easy"}
        dropdownItems={difficultyOptions}
        onDropdownItemChanged={changeDifficulty}
      />
      <Button label={"Generate"} onClick={generateNewGrid} />
      <Button label={"Solve"} onClick={solveGrid} />
    </div>
  );
};

export default SettingsPanel;
