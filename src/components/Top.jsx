import React from "react";

const Top = ({ numCols, hints, hintLength }) => {
  return (
    <div
      className="top-grid absolute grid border-4 border-l-4 border-b-0 border-gray-300 top-0 -translate-y-[100%]"
      style={{ "--num-cols": numCols }}
    >
      {hints.map((hint, index) => (
        <div
          key={index}
          className="top-hint flex flex-col justify-end items-center space-y-2 pb-1 w-16 border-gray-300 border-2 text-4xl font-bold"
          style={{ "--height": hintLength }}
        >
          {hint.map((num, index) => {
            return (
              <div key={index} className="text-gray-300">
                {num}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Top;
