import React from "react";
import { Die } from "./Die";
import { nanoid } from "nanoid";

const allNewDice = () =>
  Array(10)
    .fill({})
    .map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
// [...Array(10)].map(() => Math.ceil(Math.random() * 6));

export const App = () => {
  const [dice, setDice] = React.useState(allNewDice());

  const toggleDice = (dieId) => {
    setDice((oldDice) =>
      oldDice.map((oldDie) => {
        return oldDie.id === dieId
          ? { ...oldDie, isHeld: !oldDie.isHeld }
          : oldDie;
      })
    );
  };

  const diceElements =
    dice &&
    dice.map((die) => (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => toggleDice(die.id)}
      />
    ));

  const rollNewDie = (die) => ({ ...die, value: Math.ceil(Math.random() * 6) });

  const rollDice = () => {
    setDice((oldDice) =>
      oldDice.map((oldDie) => {
        return oldDie.isHeld ? oldDie : rollNewDie(oldDie);
      })
    );
  };
  // if dice.isHeld is true, don't roll it

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
