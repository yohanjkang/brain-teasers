import React from "react";

const SettingsPanel = ({ generateNewGrid, solveGrid }) => {
  return (
    <div className="h-full min-w-[400px] self-end bg-gray-500 text-white">
      <button
        type="button"
        className="p-6 bg-blue-300"
        onMouseDown={() => generateNewGrid()}
      >
        Generate
      </button>
      <button
        type="button"
        className="p-6 bg-blue-300"
        onMouseDown={() => solveGrid()}
      >
        Solve
      </button>
    </div>
  );
};

export default SettingsPanel;
