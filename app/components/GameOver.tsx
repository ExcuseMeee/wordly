import { RefObject, useEffect, useRef } from "react";
import { useWordly } from "../context/WordlyContext";
import Link from "next/link";
import Image from "next/image";

type ComponentProps = {
  modalRef: RefObject<HTMLDialogElement>;
};

const GameOver = ({ modalRef }: ComponentProps) => {
  const { solved, word } = useWordly();

  return (
    <div className="w-56 h-56 flex flex-col justify-evenly">
      <div className="grid place-items-center">
        {solved ? (
          <Image src={"checkmark.svg"} alt="checkmark" width={50} height={50} />
        ) : (
          <Image src={"xmark.svg"} alt="checkmark" width={50} height={50} />
        )}
      </div>
      <div className="flex flex-col space-y-0.5">
        <div className="text-center text-2xl font-bold">
          {solved ? <div>You Got It!</div> : <div>Nice Try!</div>}
        </div>
        <div className="text-center">
          The word was:{" "}
          <Link
            href={`https://www.dictionary.com/browse/${word}`}
            target="_blank"
            className="underline underline-offset-2 text-blue-600 hover:text-blue-400 focus:outline-none"
          >
            {word.toUpperCase()}
          </Link>
        </div>
      </div>
      <button
        onClick={() => modalRef.current?.close()}
        className="focus:outline-none border-2 w-1/2 rounded-lg mx-auto mt-2 p-2 hover:text-red-500 hover:border-red-500"
      >
        Close
      </button>
    </div>
  );
};
export default GameOver;
