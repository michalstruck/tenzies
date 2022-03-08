import React from "react";
import { Die } from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

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
  const [tenzies, setTenzies] = React.useState(false);
  const [scoreboard, setScoreboard] = React.useState({
    rolls: 0,
    time: 0,
  });

  const toggleDice = (dieId: string) => {
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

  // const rollNewDie = (die) => ({ ...die, value: Math.ceil(Math.random() * 6) });

  const rollDice = () => {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((oldDie) => {
          return oldDie.isHeld
            ? oldDie
            : { ...oldDie, value: Math.ceil(Math.random() * 6) };
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  };

  // keep two states in sync

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld === true);
    const allSameValue = dice.every((die) => die.value === dice[0].value);
    if (allSameValue && allHeld) {
      setTenzies(true);
    }
  }, [dice]);

  // const scoreboardStorage = window.localStorage;

  // React.useEffect(() => {
  //   const time = setInterval(); wont work
  // }, [dice, tenzies]);

  // add scoreboard - the least number of rolls, timer - saved to localStorage, real dots on dice in css maybe?
  // add window resize response to Confetti

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="content">
        <h1 className="title">Tenzies</h1>
        <p className="description">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="content--grid">{diceElements}</div>
        {
          <button onClick={rollDice} className="button--roll">
            {tenzies ? "New game" : "Roll"}
          </button>
        }
      </div>
    </main>
  );
};
