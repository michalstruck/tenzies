import "../styles/Die.css";

interface PropTypes {
  value: number;
  isHeld: boolean;
  holdDice: () => void;
}

//dice listd from 1 to 6 with proper location on die face

const DICE = [
  ["", "", "", "", "·", "", "", "", ""],
  ["·", "", "", "", "", "", "", "", "·"],
  ["", "", "·", "", "·", "", "·", "", ""],
  ["·", "", "·", "", "", "", "·", "", "·"],
  ["·", "", "·", "", "·", "", "·", "", "·"],
  ["·", "", "·", "·", "", "·", "·", "", "·"],
];

export const Die = ({ value, isHeld, holdDice }: PropTypes) => {
  return (
    <div
      onClick={holdDice}
      className={isHeld ? "content-die die-held" : "content-die die-not-held"}
    >
      {DICE[value - 1].map((dot, i) => (
        <div className={"die-filler"} key={i}>
          {dot}
        </div>
      ))}
    </div>
  );
};
