import { useCallback, useEffect, useRef } from "react";
import MiniCell from "./MiniCell";

const MiniGrid = ({ gridState, gridSize }) => {
  const cellRefs = useRef(
    Array.from({ length: gridSize.rows }, () => {
      return Array.from({ length: gridSize.columns }, () => null);
    })
  );

  const grid = Array(gridSize.rows).fill(Array(gridSize.columns).fill(null));

  const createGrid = useCallback(() => {
    return grid.map((row, rowIndex) => {
      return row.map((_, colIndex) => {
        return (
          <MiniCell
            ref={(r) => (cellRefs.current[rowIndex][colIndex] = r)}
            key={`${rowIndex}-${colIndex}`}
          />
        );
      });
    });
  }, [grid]);

  useEffect(() => {
    gridState.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        cellRefs.current?.[rowIndex][colIndex].setSelectedState(
          gridState[rowIndex][colIndex]
        );
      });
    });
  }, [gridState]);

  return (
    <div
      className="game-grid grid"
      style={{ "--num-rows": gridSize.rows, "--num-cols": gridSize.columns }}
    >
      {createGrid()}
    </div>
  );
};

export default MiniGrid;
