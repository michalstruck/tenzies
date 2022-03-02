import React from "react";
import { Die } from "./Die";
import { nanoid } from "nanoid";

const allNewDice = () =>
  Array(10)
    .fill({})
    .map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: true,
      id: nanoid(),
    }));

// [...Array(10)].map(() => Math.ceil(Math.random() * 6));

export const App = () => {
  const [dice, setDice] = React.useState(allNewDice());

  const toggleDice = (dieId) => {
    console.log(dieId);
  };

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      handleOnClick={() => toggleDice(die.id)}
    />
  ));

  const rollDice = () => setDice(() => allNewDice());

  return (
    <main>
      <div className="content">
        <h1 className="title">Tenzies</h1>
        <p className="description">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="content--grid">{diceElements}</div>
        <button onClick={rollDice} className="button--roll">
          Roll
        </button>
      </div>
    </main>
  );
};
