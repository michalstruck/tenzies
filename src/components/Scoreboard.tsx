import { useEffect, useState } from "react";
import "../styles/Scoreboard.css";

interface propTypes {
  isGameFinished: boolean;
  rollNumber: number;
  firstRollOfGame: boolean;
}

export const Scoreboard = ({
  isGameFinished,
  rollNumber,
  firstRollOfGame,
}: propTypes) => {
  const [timer, setTimer] = useState({
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (isGameFinished) {
      clearInterval(interval!);
    } else if (rollNumber) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [firstRollOfGame, isGameFinished]);

  console.log(isGameFinished);

  return (
    <div className="scoreboard-container">
      <div className="scoreboard-main">
        <h3 className="scoreboard-title">SCOREBOARD</h3>
        <div className="scoreboard-stats">
          {/* Time: {timer.minutes.toString().padStart(2, "0")}:
          {timer.seconds.toString().padStart(2, "0")}:
          {timer.milliseconds.toString().padStart(3, "0")}
          <br /> */}
          Time:{" "}
          {
            // (time / 6000).toString().padStart(2, "0") +
            Math.round(time / 1000)
              .toString()
              .padStart(2, "0")
          }
          s
          <br />
          Number of rolls: {rollNumber}
        </div>
      </div>
    </div>
  );
};
