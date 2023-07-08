import { useRef } from "react";
import { CellData } from "../context/WordlyContext";

type ComponentProps = {
  cellData: CellData;
  index: number;
};

const Cell = ({ cellData, index }: ComponentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const delay = index * 400; //ms
  const duration = 0.8; //s

  switch (cellData.state) {
    case "Correct":
      ref.current?.style.setProperty("--delay", `${delay}ms`);
      ref.current?.style.setProperty("--duration", `${duration}s`);
      ref.current?.classList.add("animate");
      break;
    case "Close":
      ref.current?.style.setProperty("--delay", `${delay}ms`);
      ref.current?.style.setProperty("--duration", `${duration}s`);
      ref.current?.classList.add("animate");
      break;
    case "Incorrect":
      ref.current?.style.setProperty("--delay", `${delay}ms`);
      ref.current?.style.setProperty("--duration", `${duration}s`);
      ref.current?.classList.add("animate");
      break;
    default:
      break;
  }

  setTimeout(() => {
    cellData.state === "Correct"
      ? ref.current?.classList.add("bg-green-500")
      : cellData.state === "Close"
      ? ref.current?.classList.add("bg-yellow-500")
      : cellData.state === "Incorrect"
      ? ref.current?.classList.add("bg-gray-500")
      : ref.current?.classList.add("bg-none");
  }, (delay + (duration * 500)));

  const cellBorder = cellData.letter ? "border-black" : "";
  return (
    <div
      className={`border-2 ${cellBorder} w-14 h-14 m-0.5 flex justify-center items-center font-bold select-none`}
      ref={ref}
    >
      {cellData.letter.toUpperCase()}
    </div>
  );
};

export default Cell;
