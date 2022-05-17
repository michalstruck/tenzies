import { useCallback, useState, useEffect } from "react";
import "./styles/App.css";
import { Die } from "./components/Die";
import Confetti from "react-confetti";
import { Scoreboard } from "./components/Scoreboard";
import { useWindowSize } from "usehooks-ts";

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
  const [rollNumber, setRollNumber] = useState(0);
  const [firstRollOfGame, setFirstRoll] = useState(true);
  const { height, width } = useWindowSize(); //write my own hook

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
      oldDice.map((oldDie) =>
        oldDie.id === dieId ? { ...oldDie, isHeld: !oldDie.isHeld } : oldDie
      )
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

  const rollDice = () => {
    if (!isGameFinished) {
      setRollNumber(rollNumber + 1);
      setFirstRoll(false);
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
      setRollNumber(0);
      setFirstRoll(true);
    }
  };

  useEffect(() => {
    if (allSameValue() && allHeld()) {
      setIsGameFinished(true);
    }
  }, [dice, allSameValue, allHeld]);

  return (
    <>
      <Scoreboard
        isGameFinished={isGameFinished}
        rollNumber={rollNumber}
        firstRollOfGame={firstRollOfGame}
      />
      <main>
        {isGameFinished && <Confetti width={width} height={height} />}
        <div className="content">
          <h1 className="title">Tenzies</h1>
          <p className="description">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="content-grid">{diceElements}</div>

          <button onClick={rollDice} className="button-roll">
            {!firstRollOfGame || isGameFinished ? "Roll" : "New game"}
          </button>
        </div>
      </main>
    </>
  );
};
