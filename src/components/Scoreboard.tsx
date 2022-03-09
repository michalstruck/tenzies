import React from "react";
import "../styles/Scoreboard.css";
import { useStopwatch } from "react-timer-hook";

export const Scoreboard = () => {
  const { seconds, start, reset } = useStopwatch({ autoStart: false });
  const [scoreboard, setScoreboard] = React.useState({
    rolls: 0,
    time: [0, 0],
  });

  React.useEffect(
    () =>
      setScoreboard((scoreboard) => ({
        ...scoreboard,
        time: [seconds, scoreboard.time[1]],
      })),
    [seconds]
  );

  //maybe use react-timer-hook for the timer
  return (
    <div className="scoreboard-main">
      <h3 onClick={start}>SCOREBOARD</h3>
      Time: {scoreboard.time} <br></br>
      Number of rolls: {scoreboard.rolls}
    </div>
  );
};
