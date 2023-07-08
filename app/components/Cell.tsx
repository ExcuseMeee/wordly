import { useRef } from "react";
import { CellData } from "../context/WordlyContext";

type ComponentProps = {
  cellData: CellData;
  index: number;
  animationTiming: {
    delay: number;
    duration: number;
  };
};

const Cell = ({ cellData, index, animationTiming }: ComponentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { delay, duration } = animationTiming;
  const delay_ = index * delay;

  switch (cellData.state) {
    case "Correct":
      ref.current?.style.setProperty("--delay", `${delay_}ms`);
      ref.current?.style.setProperty("--duration", `${duration}ms`);
      ref.current?.classList.add("animate");
      break;
    case "Close":
      ref.current?.style.setProperty("--delay", `${delay_}ms`);
      ref.current?.style.setProperty("--duration", `${duration}ms`);
      ref.current?.classList.add("animate");
      break;
    case "Incorrect":
      ref.current?.style.setProperty("--delay", `${delay_}ms`);
      ref.current?.style.setProperty("--duration", `${duration}ms`);
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
  }, delay_ + duration / 2);

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
