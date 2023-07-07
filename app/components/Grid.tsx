"use client";
import { useEffect, useRef } from "react";
import { useWordly } from "../context/WordlyContext";
import Row from "./Row";
import GameOver from "./GameOver";

const Grid = () => {
  const { board, gameFinished, resetWordly, setModalOpen } = useWordly();
  const modalRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (gameFinished) {
      modalRef.current?.showModal();
      setModalOpen(true);
    }
  }, [gameFinished]);

  return (
    <div className="flex justify-center">
      <div>
        {board.map((row, i) => (
          <Row key={i} rowData={row} />
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
