import React from "react";

export const Die = ({ value, isHeld, handleOnClick }) => {
  return (
    <h3>
      <div
        onClick={handleOnClick}
        className={
          isHeld ? "content--die die--held" : "content--die die--not--held"
        }
      >
        {value}
      </div>
    </h3>
  );
};
