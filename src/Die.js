import React from "react";

export const Die = ({ value, isHeld, holdDice }) => {
  return (
    <h2>
      <div
        onClick={holdDice}
        className={
          isHeld ? "content--die die--held" : "content--die die--not--held"
        }
      >
        {value}
      </div>
    </h2>
  );
};
