import { useState, useEffect, useCallback } from "react";
import Grid from "./components/Grid";
import Left from "./components/Left";
import Top from "./components/Top";
import SettingsPanel from "./components/SettingsPanel";
import NumCorrectCellsContext from "./components/NumCorrectCellsContext";
import { generateGrid } from "./components/GridManager";

const countSequences = (answer, gridSize, isRow) => {
  console.log(answer);

  let count = 0;
  let result = Array.from({ length: gridSize }, () => []);

  for (let i = 0; i < answer.length; i++) {
    count = 0;
    for (let j = 0; j < answer.length; j++) {
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

function App() {
  const [gridSize, setGridSize] = useState({ rows: 6, columns: 6 });
  const [answer, setAnswer] = useState(null);
  const [solved, setSolved] = useState(false);
  const [topHintLength, setTopHintLength] = useState(1);
  const [leftHintLength, setLeftHintLength] = useState(1);
  const [topHints, setTopHints] = useState([]);
  const [leftHints, setLeftHints] = useState([]);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numIncorrect, setNumIncorrect] = useState(0);

  const generateNewGrid = useCallback(() => {
    setAnswer(generateGrid(gridSize.rows, gridSize.columns));
  }, [gridSize.columns, gridSize.rows]);

  const solveGrid = () => {
    setSolved(true);
    console.log(solved);
  };

  const onCorrectCellSelected = (selected) => {
    setNumCorrect(numCorrect + (selected ? 1 : -1));
  };

  const onIncorrectCellSelected = (selected) => {
    setNumIncorrect(numIncorrect + (selected ? 1 : -1));
  };

  useEffect(() => {
    generateNewGrid();
  }, [generateNewGrid]);

  useEffect(() => {
    if (!answer) return;

    const topHints = countSequences(answer, gridSize.columns, false);
    const leftHints = countSequences(answer, gridSize.rows, true);

    setTopHints(topHints);
    setLeftHints(leftHints);

    setTopHintLength(Math.max(...topHints.map((row) => row.length)));
    setLeftHintLength(Math.max(...leftHints.map((col) => col.length)));
  }, [answer, gridSize.columns, gridSize.rows]);

  useEffect(() => {
    if (!answer) return;
    if (numIncorrect > 0) return;

    const flatArray = answer.flat();
    const numCorrectCells = flatArray.filter((val) => val === 1).length;

    if (numCorrectCells === numCorrect) {
      setSolved(true);
      console.log("Win!");
    }
  }, [numCorrect, numIncorrect, answer]);

  if (!answer) {
    return;
  }

  return (
    <NumCorrectCellsContext.Provider
      value={{ solved, onCorrectCellSelected, onIncorrectCellSelected }}
    >
      <div className="flex relative justify-center items-center h-[100vh] w-full bg-gray-950">
        <SettingsPanel
          generateNewGrid={generateNewGrid}
          solveGrid={solveGrid}
        />
        <div className="relative">
          <Top
            numCols={gridSize.columns}
            hints={topHints}
            hintLength={topHintLength}
          />
          <Left
            numRows={gridSize.rows}
            hints={leftHints}
            hintLength={leftHintLength}
          />
          <Grid gridSize={gridSize} answer={answer} />
        </div>
      </div>
    </NumCorrectCellsContext.Provider>
  );
}

export default App;
