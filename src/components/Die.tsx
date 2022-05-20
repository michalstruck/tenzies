import { useCallback } from "react";
import "../styles/Die.css";

interface PropTypes {
  value: number;
  isHeld: boolean;
  holdDice: () => void;
}

export const Die = ({ value, isHeld, holdDice }: PropTypes) => {
  const renderedDots = useCallback(() => {
    let dots;
    let temp = Array(9).fill("");
    if (value % 2 === 1) {
      if (value === 1) {
        temp[4] = "·";
        dots = temp.map((dot, i) => (
          <div className={"die-filler"} key={i}>
            {dot}
          </div>
        ));
      } else if (value === 3) {
        temp[2] = "·";
        temp[4] = "·";
        temp[6] = "·";
        dots = temp.map((dot, i) => (
          <div className={"die-filler"} key={i}>
            {dot}
          </div>
        ));
      } else {
        temp[0] = "·";
        temp[2] = "·";
        temp[4] = "·";
        temp[6] = "·";
        temp[8] = "·";
        dots = temp.map((dot, i) => (
          <div className={"die-filler"} key={i}>
            {dot}
          </div>
        ));
      }
    } else {
      if (value === 2) {
        temp[0] = "·";
        temp[8] = "·";
        dots = temp.map((dot, i) => (
          <div className={"die-filler"} key={i}>
            {dot}
          </div>
        ));
      } else if (value === 4) {
        temp[0] = "·";
        temp[2] = "·";
        temp[6] = "·";
        temp[8] = "·";
        dots = temp.map((dot, i) => (
          <div className={"die-filler"} key={i}>
            {dot}
          </div>
        ));
      } else {
        temp[0] = "·";
        temp[2] = "·";
        temp[3] = "·";
        temp[5] = "·";
        temp[6] = "·";
        temp[8] = "·";
        dots = temp.map((dot, i) => (
          <div className={"die-filler"} key={i}>
            {dot}
          </div>
        ));
      }
    }
    return dots;
  }, [value]);

  return (
    <div
      onClick={holdDice}
      className={isHeld ? "content-die die-held" : "content-die die-not-held"}
    >
      {renderedDots()}
    </div>
  );
};
