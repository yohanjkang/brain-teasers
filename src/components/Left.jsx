import React from "react";

const Left = ({ numRows, hints, hintLength }) => {
  return (
    <div
      className="left-grid absolute grid border-4 border-r-0 border-gray-300 left-0 -translate-x-[100%]"
      style={{ "--num-rows": numRows }}
    >
      {hints.map((hint, index) => (
        <div
          key={index}
          className="left-hint flex flex-row justify-end items-center space-x-3 h-16 pr-1 border-gray-300 border-2 text-4xl font-bold"
          style={{ "--width": hintLength }}
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

export default Left;
