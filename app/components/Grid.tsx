"use client";
import { useEffect, useRef } from "react";
import { useWordly } from "../context/WordlyContext";
import Row from "./Row";
import GameOver from "./GameOver";
import { AnimationTiming } from "../page";

type ComponentProps = {
  animationTiming: AnimationTiming;
};

const Grid = ({ animationTiming }: ComponentProps) => {
  const { board, gameFinished, resetWordly } = useWordly();
  const { delay, duration } = animationTiming;

  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (gameFinished) {
      setTimeout(() => {
        modalRef.current?.showModal();
      }, 4 * delay + duration + 100); // add 100ms offset for more pleasant timing
    }
  }, [gameFinished]);

  return (
    <div className="flex justify-center">
      <div>
        {board.map((row, i) => (
          <Row key={i} rowData={row} animationTiming={animationTiming} rowIndex={i} />
        ))}
      </div>
      <dialog
        ref={modalRef}
        className="focus:outline-none rounded-md"
        onClose={() => resetWordly()}
      >
        <GameOver modalRef={modalRef} />
      </dialog>
    </div>
  );
};

export default Grid;
