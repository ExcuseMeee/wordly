"use client";
import { useWordly } from "../context/WordlyContext";

type ComponentProps = {
  key_: string;
};

const Key = ({ key_ }: ComponentProps) => {
  const { addLetter, usedLetters } = useWordly();

  const cellState = usedLetters.current.get(key_);
  const keyColor =
    cellState === "Correct"
      ? "bg-green-500"
      : cellState === "Close"
      ? "bg-yellow-500"
      : cellState === "Incorrect"
      ? "bg-gray-500"
      : "bg-gray-200";

  return (
    <div
      className={`${keyColor} rounded-lg w-10 h-12 hover:cursor-pointer flex justify-center items-center select-none m-0.5 font-bold`}
      onClick={() => {
        addLetter(key_);
      }}
    >
      {key_.toUpperCase()}
    </div>
  );
};
export default Key;
