const chanceToBeTrue = 55;

export const generateGrid = (rows, columns) => {
  const zeroGrid = Array.from({ length: rows }, () => {
    return Array.from({ length: columns }, () =>
      Math.floor(Math.random() * 100) >= chanceToBeTrue ? 0 : 1
    );
  });

  return zeroGrid;
};
