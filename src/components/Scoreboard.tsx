import { useEffect, useState } from "react";
import "../styles/Scoreboard.css";

interface propTypes {
  isGameFinished: boolean;
  rollNumber: number;
  firstRollOfGame: boolean;
}

let interval: NodeJS.Timer;

if (
  (localStorage.getItem("rollATB") || localStorage.getItem("timeATB")) &&
  localStorage.getItem("timeATB") === "0" &&
  localStorage.getItem("rollATB") === "0"
) {
  localStorage.setItem("rollATB", "");
  localStorage.setItem("timeATB", "");
}

export const Scoreboard = ({
  isGameFinished,
  rollNumber,
  firstRollOfGame,
}: propTypes) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (isGameFinished) {
      clearInterval(interval!);
      setTime(0);
    } else if (rollNumber) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [firstRollOfGame, isGameFinished]);

  useEffect(() => {
    if (
      localStorage.getItem("rollATB")! > `${rollNumber}` &&
      rollNumber !== 0
    ) {
      localStorage.setItem("rollATB", `${rollNumber}`);
    }

    if (localStorage.getItem("timeATB")! > `${time}` && time !== 0) {
      localStorage.setItem("timeATB", `${time}`);
    }
    console.log("triggered localStorage change");
  }, [isGameFinished]);

  return (
    <div className="scoreboard-container">
      <div className="scoreboard-main">
        <h3 className="scoreboard-title">SCOREBOARD</h3>
        <div className="scoreboard-stats">
          Time: {time.toString().padStart(2, "0")}
          s
          <br />
          Number of rolls: {rollNumber}
          <br />
          All time best:{" "}
          {localStorage.getItem("timeATB")!.padStart(2, "0") +
            "s@" +
            localStorage.getItem("rollATB")!.padStart(2, "0") +
            "rolls"}
        </div>
      </div>
    </div>
  );
};
