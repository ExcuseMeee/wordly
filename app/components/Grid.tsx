"use client";
import { useEffect, useRef } from "react";
import { useWordly } from "../context/WordlyContext";
import Row from "./Row";

const Grid = () => {
  const { board, gameFinished, resetWordly } = useWordly();
  const modalRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    console.log("ran");
    if (gameFinished) {
      modalRef.current?.showModal();
    }
  }, [gameFinished]);

  return (
    <div className="flex justify-center border border-black">
      <div>
        {board.map((row, i) => (
          <Row key={i} rowData={row} />
        ))}
      </div>
      <dialog
        ref={modalRef}
        className="focus:outline-none"
        onClose={() => resetWordly()}
      >
        TEST
      </dialog>
    </div>
  );
};

export default Grid;
