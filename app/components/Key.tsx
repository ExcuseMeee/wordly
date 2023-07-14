"use client";
import { useEffect, useState } from "react";
import { useWordly } from "../context/WordlyContext";
import { AnimationTiming } from "../page";
import Image from "next/image";

type ComponentProps = {
  key_: string;
  animationTiming: AnimationTiming;
};

const Key = ({ key_, animationTiming }: ComponentProps) => {
  const { addLetter, usedLetters, currentTurn, submitGuess, deleteLetter } =
    useWordly();
  const { flipDelay, flipDuration } = animationTiming;

  const cellState = usedLetters.current.get(key_);

  const isSpecial = key_ === "Enter" || key_ === "Delete";

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
      className={`${keyColor} rounded-lg ${
        isSpecial ? "h-14 w-16" : "w-11 h-14"
      } hover:cursor-pointer grid place-items-center select-none m-[2.5px] font-bold text-white `}
      onClick={() => {
        if (key_ === "Enter") {
          submitGuess();
        } else if (key_ === "Delete") {
          deleteLetter();
        } else {
          addLetter(key_);
        }
      }}
    >
      {key_ === "Delete" ? (
        <Image
          src={"backspace.svg"}
          alt="Backspace"
          width={25}
          height={25}
          className="mr-0.5"
        />
      ) : (
        key_.toUpperCase()
      )}
    </div>
  );
};
export default Key;
