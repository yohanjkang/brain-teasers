const chanceToBeTrue = 55;

export const generateGrid = (rows, columns) => {
  const newGrid = Array.from({ length: rows }, () => {
    return Array.from({ length: columns }, () =>
      Math.floor(Math.random() * 100) >= chanceToBeTrue ? 0 : 1
    );
  });

  return newGrid;
};

export const createGrid = (gridSize) => {
  const newGrid = Array.from({ length: gridSize.rows }, () => {
    return Array.from({ length: gridSize.columns }, () => false);
  });

  return newGrid;
};

export const countSequences = (answer, gridSize, isRow) => {
  const primaryAxis = isRow ? gridSize.rows : gridSize.columns;
  const secondaryAxis = isRow ? gridSize.columns : gridSize.rows;
  let count = 0;
  let result = Array.from({ length: primaryAxis }, () => []);

  for (let i = 0; i < primaryAxis; i++) {
    count = 0;
    for (let j = 0; j < secondaryAxis; j++) {
      let value = isRow ? answer[i][j] : answer[j][i];
      if (value === 1) {
        count++;
      } else {
        if (count > 0) {
          result[i].push(count);
        }
        count = 0;
      }
    }
    if (count > 0) {
      result[i].push(count);
    } else {
      if (result[i].length === 0) {
        result[i].push(0);
      }
    }
  }

  return result;
};
