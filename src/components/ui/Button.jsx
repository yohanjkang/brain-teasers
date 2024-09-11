import React from "react";

const Button = ({ label, onClick }) => {
  const className =
    "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 " +
    "dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";

  return (
    <button type="button" className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
