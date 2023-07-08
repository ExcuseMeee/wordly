"use client";
import Image from "next/image";
import { useWordly } from "../context/WordlyContext";
import KeyBoardRow from "./KeyBoardRow";

type ComponentProps = {
  animationTiming: {
    delay: number;
    duration: number;
  };
};

const Keyboard = ({ animationTiming }: ComponentProps) => {
  const { submitGuess, deleteLetter } = useWordly();

  return (
    <div className="flex flex-col items-center">
      <KeyBoardRow keys={["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]} animationTiming={animationTiming} />
      <KeyBoardRow keys={["a", "s", "d", "f", "g", "h", "j", "k", "l"]} animationTiming={animationTiming} />
      <div className="flex items-center">
        <div
          className="h-12 w-16 bg-gray-200 rounded-lg hover:cursor-pointer select-none m-0.5 flex justify-center items-center font-semibold"
          onClick={() => submitGuess()}
        >
          Enter
        </div>
        <KeyBoardRow keys={["z", "x", "c", "v", "b", "n", "m"]} animationTiming={animationTiming} />
        <div
          className="h-12 w-16 bg-gray-200 rounded-lg hover:cursor-pointer select-none m-0.5 flex justify-center items-center"
          onClick={() => deleteLetter()}
        >
          <Image
            src={"backspace.svg"}
            alt="Backspace"
            width={25}
            height={25}
            className="mr-0.5"
          />
        </div>
      </div>
    </div>
  );
};
export default Keyboard;
