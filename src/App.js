import { useState, useEffect, useCallback, useRef } from "react";
import Grid from "./components/Grid";
import Left from "./components/Left";
import Top from "./components/Top";
import SettingsPanel from "./components/SettingsPanel";
import GridSettingsContext from "./components/GridSettingsContext";
import { countSequences, generateGrid } from "./components/GridManager";

function App() {
  const [gridSize, setGridSize] = useState({ rows: 10, columns: 10 });
  const [answer, setAnswer] = useState(null);
  const [solved, setSolved] = useState(false);
  const [topHintLength, setTopHintLength] = useState(1);
  const [leftHintLength, setLeftHintLength] = useState(1);
  const [topHints, setTopHints] = useState([]);
  const [leftHints, setLeftHints] = useState([]);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numIncorrect, setNumIncorrect] = useState(0);

  const generateNewGrid = useCallback(() => {
    setSolved(false);
    setAnswer(generateGrid(gridSize.rows, gridSize.columns));

    console.log("Generating new game");
  }, [gridSize.columns, gridSize.rows]);

  const solveGrid = () => {
    setSolved(true);
  };

  const onCorrectCellSelected = (selected) => {
    setNumCorrect(numCorrect + (selected ? 1 : -1));
  };

  const onIncorrectCellSelected = (selected) => {
    setNumIncorrect(numIncorrect + (selected ? 1 : -1));
  };

  // Prevent dragging since it causes odd behaviour when dragging the grid
  useEffect(() => {
    const preventDrag = (e) => {
      e.preventDefault();
    };

    document.addEventListener("dragstart", preventDrag);

    return () => {
      document.removeEventListener("dragstart", preventDrag);
    };
  }, []);

  useEffect(() => {
    generateNewGrid();
  }, [generateNewGrid]);

  useEffect(() => {
    if (!answer) return;

    const topHints = countSequences(answer, gridSize, false);
    const leftHints = countSequences(answer, gridSize, true);

    setTopHints(topHints);
    setLeftHints(leftHints);

    setTopHintLength(Math.max(...topHints.map((row) => row.length)));
    setLeftHintLength(Math.max(...leftHints.map((col) => col.length)));
  }, [answer, gridSize]);

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
    <GridSettingsContext.Provider
      value={{ solved, onCorrectCellSelected, onIncorrectCellSelected }}
    >
      <div className="flex items-center justify-between h-[100vh] w-full bg-gray-950">
        <div className="flex flex-grow justify-center items-center">
          <div className="relative scale-75">
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
        <SettingsPanel
          generateNewGrid={generateNewGrid}
          solveGrid={solveGrid}
        />
      </div>
    </GridSettingsContext.Provider>
  );
}

export default App;
