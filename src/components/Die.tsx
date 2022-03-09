import React from "react";

interface PropTypes {
  value: number;
  isHeld: boolean;
  holdDice: () => void;
}

export const Die = ({ value, isHeld, holdDice }: PropTypes) => {
  return (
    <h2>
      <div
        onClick={holdDice}
        className={isHeld ? "content-die die-held" : "content-die die-not-held"}
      >
        {value}
      </div>
    </h2>
  );
};
