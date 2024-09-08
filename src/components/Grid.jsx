import Cell from "./Cell";

const Grid = ({ gridSize, answer }) => {
  const grid = Array(gridSize.rows).fill(Array(gridSize.columns).fill(null));

  return (
    <div
      className="game-grid grid border-4 border-gray-300"
      style={{ "--num-rows": gridSize.rows, "--num-cols": gridSize.columns }}
    >
      {grid.map((row, rowIndex) => {
        return row.map((_, colIndex) => {
          return (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              partOfAnswer={answer[rowIndex][colIndex] === 1}
            />
          );
        });
      })}
    </div>
  );
};

export default Grid;
