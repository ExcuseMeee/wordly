"use client";
import { useWordly } from "../context/WordlyContext";
import KeyBoardRow from "./KeyBoardRow";

const Keyboard = () => {
  const { submitGuess, deleteLetter } = useWordly();

  return (
    <div className="flex flex-col items-center">
      <KeyBoardRow keys={["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]} />
      <KeyBoardRow keys={["a", "s", "d", "f", "g", "h", "j", "k", "l"]} />
      <div className="flex items-center">
        <div className="h-12 w-16 border hover:cursor-pointer select-none mx-0.5" onClick={() => submitGuess()}>
          Enter
        </div>
        <KeyBoardRow keys={["z", "x", "c", "v", "b", "n", "m"]} />
        <div className="h-12 w-16 border hover:cursor-pointer select-none mx-0.5" onClick={() => deleteLetter()}>
          Delete
        </div>
      </div>
    </div>
  );
};
export default Keyboard;
