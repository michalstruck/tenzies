import React from "react";
import { Die } from "./Die";
import { v4 as uuidv4 } from "uuid";

export const App = () => {
  const [dice, setDice] = React.useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    console.log(newDice);
    return newDice;
  }

  return (
    <main>
      <div className="content">
        <h1 className="title">Tenzies</h1>
        <p className="description">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="content--grid">
          {dice.map((dieValue) => (
            <Die key={uuidv4()} value={dieValue} />
          ))}
        </div>
        <button className="button--roll">Roll</button>
      </div>
    </main>
  );
};
