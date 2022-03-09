import React from "react";
import "./styles/App.css";
import { Die } from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { Scoreboard } from "./components/Scoreboard";

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
  const [gameState, setGameState] = React.useState(false);

  const allHeld = React.useCallback(
    () => dice.every((die) => die.isHeld === true),
    [dice]
  );
  const allSameValue = React.useCallback(
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
  // if gameState is true - keep the timer going, if dice.filter(return dice with isHeld set to true) returns an empty array
  // don't keep track of rolls
  // if gameState is false - stop the timer,

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
    if (gameState) {
      setDice((oldDice) =>
        oldDice.map((oldDie) => {
          return oldDie.isHeld
            ? oldDie
            : { ...oldDie, value: Math.ceil(Math.random() * 6) };
        })
      );
    } else {
      setGameState(true);
      setDice(allNewDice());
    }
  };

  // keep two states in sync
  React.useEffect(() => {
    if (allSameValue() && allHeld()) {
      setGameState(false);
    }
  }, [dice, allSameValue, allHeld]);

  return (
    //solve the problem of confetti on startup
    <>
      <Scoreboard gameState={gameState} />
      <main>
        {!gameState && <Confetti />}
        <div className="content">
          <h1 className="title">Tenzies</h1>
          <p className="description">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="content-grid">{diceElements}</div>
          {gameState ? (
            <button
              name="rollButton"
              onClick={rollDice}
              className="button-roll"
            >
              Roll
            </button>
          ) : (
            <button
              name="newGameButton"
              onClick={rollDice}
              className="button-roll"
            >
              New game
            </button>
          )}
        </div>
      </main>
    </>
  );
};
