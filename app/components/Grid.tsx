"use client";
import { useWordly } from "../context/WordlyContext";
import Row from "./Row";

const Grid = () => {
  const { board } = useWordly();

  return (
    <div className="flex justify-center border border-black">
      <div>
        {board.map((row, i) => (
          <Row key={i} rowData={row} />
        ))}
      </div>
    </div>
  );
};

export default Grid;
