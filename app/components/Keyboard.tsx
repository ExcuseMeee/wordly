"use client";
import KeyBoardRow from "./KeyBoardRow";

const Keyboard = () => {
  return (
    <div className="flex flex-col items-center">
      <KeyBoardRow keys={["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]} />
      <KeyBoardRow keys={["a", "s", "d", "f", "g", "h", "j", "k", "l"]} />
      <KeyBoardRow keys={["z", "x", "c", "v", "b", "n", "m"]} />
    </div>
  );
};
export default Keyboard;
