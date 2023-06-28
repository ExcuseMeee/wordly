"use client";
import { useWordly } from "../context/WordlyContext";
import Row from "./Row";

const Grid = () => {
  const { word, board } = useWordly();

  return (
    <div>
      {board.map((row, i)=> (
        <Row key={i} rowData={row}/>
      ))}

      {/* <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row /> */}
    </div>
  );
};

export default Grid;
