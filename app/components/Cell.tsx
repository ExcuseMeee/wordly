import { CellData } from "../context/WordlyContext";

type ComponentProps = {
  position: number;
  cellData: CellData;
};

const Cell = ({ position, cellData }: ComponentProps) => {
  return (
    <div
      className={`border w-12 h-12 ${
        cellData.state === "Correct"
          ? "bg-green-500"
          : cellData.state === "Close"
          ? "bg-blue-500"
          : cellData.state === "Incorrect"
          ? "bg-gray-500"
          : "bg-none"
      } `}
    >
      {cellData.letter.toUpperCase()}
    </div>
  );
};

export default Cell;
