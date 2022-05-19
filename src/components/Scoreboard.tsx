import { useEffect, useState } from "react";
import "../styles/Scoreboard.css";

interface propTypes {
  isGameFinished: boolean;
  rollNumber: number;
  firstRollOfGame: boolean;
}

// localStorage.clear();
// sessionStorage.clear();
let interval: NodeJS.Timer;

if (!localStorage.getItem("rollATB") || !localStorage.getItem("timeATB")) {
  localStorage.setItem("rollATB", "");
  localStorage.setItem("timeATB", "");
}

if (!sessionStorage.getItem("rollSB") || !sessionStorage.getItem("timeSB")) {
  sessionStorage.setItem("rollSB", "");
  sessionStorage.setItem("timeSB", "");
}

console.log(sessionStorage, localStorage, +"");

//fix localStorage and make sesh store
export const Scoreboard = ({
  isGameFinished,
  rollNumber,
  firstRollOfGame,
}: propTypes) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (isGameFinished) {
      clearInterval(interval);
    } else if (rollNumber) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    if (firstRollOfGame) {
      setTime(0);
    }

    return () => clearInterval(interval);
  }, [firstRollOfGame, isGameFinished]);

  useEffect(() => {
    if (+localStorage.getItem("rollATB")! > rollNumber && rollNumber !== 0) {
      localStorage.setItem("rollATB", `${rollNumber}`);
    } else if (+localStorage.getItem("rollATB")! === 0) {
      localStorage.setItem("rollATB", `${rollNumber}`);
    }

    if (+localStorage.getItem("timeATB")! > time && time !== 0) {
      localStorage.setItem("timeATB", `${time}`);
    } else if (+localStorage.getItem("timeATB")! === 0) {
      localStorage.setItem("timeATB", `${time}`);
    }
  }, [isGameFinished]);

  useEffect(() => {
    if (+sessionStorage.getItem("rollSB")! > rollNumber && rollNumber !== 0) {
      sessionStorage.setItem("rollSB", `${rollNumber}`);
    } else if (+sessionStorage.getItem("rollSB")! === 0) {
      sessionStorage.setItem("rollSB", `${rollNumber}`);
    }

    if (+sessionStorage.getItem("timeSB")! > time && time !== 0) {
      sessionStorage.setItem("timeSB", `${time}`);
    } else if (+sessionStorage.getItem("timeSB")! === 0) {
      sessionStorage.setItem("timeSB", `${time}`);
    }
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
          <br />
          Session's best:{" "}
          {sessionStorage.getItem("timeSB")!.padStart(2, "0") +
            "s@" +
            sessionStorage.getItem("rollSB")!.padStart(2, "0") +
            "rolls"}
        </div>
      </div>
    </div>
  );
};
