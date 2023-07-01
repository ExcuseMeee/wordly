import { CellData } from "../context/WordlyContext";

type ComponentProps = {
  cellData: CellData;
};

const Cell = ({ cellData }: ComponentProps) => {
  return (
    <div
      className={`border w-14 h-14 m-0.5 flex justify-center items-center font-bold ${
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
