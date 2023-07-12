"use client";
import { useEffect, useState } from "react";
import { useWordly } from "../context/WordlyContext";
import { AnimationTiming } from "../page";

type ComponentProps = {
  key_: string;
  animationTiming: AnimationTiming;
};

const Key = ({ key_, animationTiming }: ComponentProps) => {
  const { addLetter, usedLetters, currentTurn } = useWordly();
  const { flipDelay, flipDuration } = animationTiming;

  const cellState = usedLetters.current.get(key_);

  const [keyColor, setKeyColor] = useState("bg-[#818384]");
  useEffect(() => {
    if (currentTurn === 0) {
      setKeyColor("bg-[#818384]");
      return;
    }
    setTimeout(() => {
      const color =
        cellState === "Correct"
          ? "bg-green-500"
          : cellState === "Close"
          ? "bg-yellow-500"
          : cellState === "Incorrect"
          ? "bg-zinc-700"
          : "bg-[#818384]";
      setKeyColor(color);
    }, 4 * flipDelay + flipDuration);
  }, [currentTurn]);

  return (
    <div
      className={`${keyColor} rounded-lg w-10 h-12 hover:cursor-pointer flex justify-center items-center select-none m-0.5 font-bold text-white`}
      onClick={() => {
        addLetter(key_);
      }}
    >
      {key_.toUpperCase()}
    </div>
  );
};
export default Key;
