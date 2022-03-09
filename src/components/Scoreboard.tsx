import React from "react";
import "../styles/Scoreboard.css";

interface propTypes {
  gameState: boolean;
}

export const Scoreboard = ({ gameState }: propTypes) => {
  const [scoreboard, setScoreboard] = React.useState({
    rolls: 0,
    timer: [0, 0],
  });

  const [timerState, setTimerState] = React.useState(false);

  React.useEffect(() => {
    const start = () => {
      run();
      setTimerState(true);
      var tick = setInterval(run, 100);
    };
    start();
  }, [gameState]);

  var updatedMs = 0,
    updatedS = 0;

  const run = () => {
    if (updatedS === 60) {
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setScoreboard((prevScoreboard) => ({
      ...prevScoreboard,
      timer: [updatedS, updatedMs],
    }));
  };
  //////////////////////////////////////////////////////////////////////////////////////
  // const reset = () => {
  //   clearInterval(tick);
  //   setTimerState(false);
  //   setScoreboard((prevScoreboard) => ({
  //     ...prevScoreboard,
  //     timer: [0, 0],
  //   }));
  // };

  // var tick = setInterval(() => updateTimer(), 1000);
  // // const [gameTime, setGameTime] = React.useState([0, 0]);
  // var tickCount: number = 0;
  // var updatedMs: number = 0;
  // var updatedS: number = 0;
  // const updateMs = () =>
  //   setScoreboard((prevScoreboard) => ({
  //     ...prevScoreboard,
  //     timer: [prevScoreboard.timer[0], updatedMs],
  //   }));
  // const updateS = () =>
  //   setScoreboard((prevScoreboard) => ({
  //     ...prevScoreboard,
  //     timer: [updatedS, prevScoreboard.timer[1]],
  //   }));

  // const updateTimer = () => {
  //   updateMs();
  //   updateS();
  // };

  // const handleTimer = () => {
  //   if (tickCount === 100) {
  //     updatedS++;
  //     updatedMs = 0;
  //     tickCount = 0;
  //   }
  //   updatedMs++;
  //   return updateTimer();
  // };
  // React.useEffect(() => {
  //   clearInterval(tick);
  // }, [gameState]);

  return (
    <div className="scoreboard-main">
      <h3>SCOREBOARD</h3>
      Time:{" "}
      <div className="scoreboard-time">
        {scoreboard.timer[0]}s and {scoreboard.timer[1]}ms
      </div>
      <br></br>
      Number of rolls: {scoreboard.rolls}
    </div>
  );
};
