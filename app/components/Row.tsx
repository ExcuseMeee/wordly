import { CellData } from "../context/WordlyContext";
import Cell from "./Cell";
type ComponentProps = {
  rowData: CellData[];
};

const Row = ({ rowData }: ComponentProps) => {
  return (
    <div className="flex">
      {rowData.map((cellData, i)=>(
        <Cell key={i} cellData={cellData} />
      ))}
    </div>
  );
};

export default Row;
