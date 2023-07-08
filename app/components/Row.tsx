import { CellData } from "../context/WordlyContext";
import Cell from "./Cell";
type ComponentProps = {
  rowData: CellData[];
  animationTiming: {
    delay: number;
    duration: number;
  };
};

const Row = ({ rowData, animationTiming }: ComponentProps) => {
  return (
    <div className="flex">
      {rowData.map((cellData, i)=>(
        <Cell key={i} cellData={cellData} index={i} animationTiming={animationTiming} />
      ))}
    </div>
  );
};

export default Row;
