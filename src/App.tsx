import React, { useCallback, useState, useEffect } from "react";
import "./styles/App.css";
import { Die } from "./components/Die";
import Confetti from "react-confetti";
import { Scoreboard } from "./components/Scoreboard";

const allNewDice = () =>
  Array(10)
    .fill({})
    .map((die, i) => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: `${i}`,
    }));
// [...Array(10)].map(() => Math.ceil(Math.random() * 6));

export const App = () => {
  const [dice, setDice] = useState(allNewDice());
  const [isGameFinished, setIsGameFinished] = useState(false);

  const allHeld = useCallback(
    () => dice.every((die) => die.isHeld === true),
    [dice]
  );
  const allSameValue = useCallback(
    () => dice.every((die) => die.value === dice[0].value),
    [dice]
  );

  const toggleDice = (dieId: string) => {
    setDice((oldDice) =>
      oldDice.map((oldDie) => {
        return oldDie.id === dieId
          ? { ...oldDie, isHeld: !oldDie.isHeld }
          : oldDie;
      })
    );
  };
  // if isGameFinished is true - keep the timer going, if dice.filter(return dice with isHeld set to true) returns an empty array
  // don't keep track of rolls
  // if isGameFinished is false - stop the timer,

  // dice.filter((die) => (die.value === 1) | 2 | 3 | 4 | 5 | 6);

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

  const rollDice = () => {
    if (!isGameFinished) {
      setDice((oldDice) =>
        oldDice.map((oldDie) => {
          return oldDie.isHeld
            ? oldDie
            : { ...oldDie, value: Math.ceil(Math.random() * 6) };
        })
      );
    } else {
      setIsGameFinished(false);
      setDice(allNewDice());
    }
  };

  useEffect(() => {
    if (allSameValue() && allHeld()) {
      setIsGameFinished(true);
    }
  }, [dice, allSameValue, allHeld]);

  return (
    <>
      {/* <Scoreboard isGameFinished={isGameFinished} /> */}
      <main>
        {isGameFinished && <Confetti />}
        <div className="content">
          <h1 className="title">Tenzies</h1>
          <p className="description">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="content-grid">{diceElements}</div>

          <button onClick={rollDice} className="button-roll">
            {isGameFinished ? "New game" : "Roll"}
          </button>
        </div>
      </main>
    </>
  );
};
