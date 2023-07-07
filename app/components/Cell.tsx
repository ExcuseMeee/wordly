import { CellData } from "../context/WordlyContext";

type ComponentProps = {
  cellData: CellData;
};

const Cell = ({ cellData }: ComponentProps) => {
  const cellColor =
    cellData.state === "Correct"
      ? "bg-green-500"
      : cellData.state === "Close"
      ? "bg-yellow-500"
      : cellData.state === "Incorrect"
      ? "bg-gray-500"
      : "bg-none";

  const cellBorder = cellData.letter ? "border-black" : "";
  return (
    <div
      className={`border-2 ${cellBorder} w-14 h-14 m-0.5 flex justify-center items-center font-bold select-none ${cellColor}`}
    >
      {cellData.letter.toUpperCase()}
    </div>
  );
};

export default Cell;
