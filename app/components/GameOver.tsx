import { RefObject, useEffect, useRef } from "react";
import { useWordly } from "../context/WordlyContext";
import Link from "next/link";

type ComponentProps = {
  modalRef: RefObject<HTMLDialogElement>;
};

const GameOver = ({ modalRef }: ComponentProps) => {
  const { solved, word } = useWordly();

  return (
    <div className="w-52 h-52 flex flex-col justify-around">
      <div className="text-center">
        {solved ? <div>You Got It!</div> : <div>Nice Try!</div>}
      </div>
      <div className="text-center">
        The word was:{" "}
        <Link
          href={`https://www.dictionary.com/browse/${word}`}
          target="_blank"
          className="underline text-blue-700 hover:text-blue-500 focus:outline-none"
        >
          {word.toUpperCase()}
        </Link>
      </div>
      <button
        onClick={() => modalRef.current?.close()}
        className="focus:outline-none border w-fit mx-auto p-2"
      >
        Close
      </button>
    </div>
  );
};
export default GameOver;
