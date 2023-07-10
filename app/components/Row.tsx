import { useEffect, useRef, useState } from "react";
import { CellData, useWordly } from "../context/WordlyContext";
import Cell from "./Cell";
import { AnimationTiming } from "../page";

type ComponentProps = {
  rowData: CellData[];
  animationTiming: AnimationTiming;
  rowIndex: number;
};

const Row = ({ rowData, animationTiming, rowIndex }: ComponentProps) => {
  const { shudder, setShudder, currentTurn } = useWordly();
  const { shudderDuration } = animationTiming;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.style.setProperty("--shudderDuration", `${shudderDuration}ms`)
    
    if (currentTurn !== rowIndex || shudder === false) return;

    ref.current?.classList.add("animate-shake");
    setTimeout(() => {
      ref.current?.classList.remove("animate-shake");
      setShudder(false)
    }, shudderDuration);


  }, [shudder]);

  return (
    <div className="flex" ref={ref}>
      {rowData.map((cellData, i) => (
        <Cell
          key={i}
          cellData={cellData}
          index={i}
          animationTiming={animationTiming}
        />
      ))}
    </div>
  );
};

export default Row;
