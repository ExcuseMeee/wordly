"use client";
import { useRef } from "react";
import { useWordly } from "../context/WordlyContext";
import Row from "./Row";

const Grid = () => {
  const { board } = useWordly();
  const modalRef = useRef<HTMLDialogElement>(null);
  // modalRef.current?.showModal();

  return (
    <div className="flex justify-center border border-black">
      <div>
        {board.map((row, i) => (
          <Row key={i} rowData={row} />
        ))}
      </div>
      <dialog ref={modalRef}>
        TEST
      </dialog>
    </div>
  );
};

export default Grid;
