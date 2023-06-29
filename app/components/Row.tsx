import { CellData } from "../context/WordlyContext";
import Cell from "./Cell";
type ComponentProps = {
  rowData: CellData[];
};

const Row = ({ rowData }: ComponentProps) => {
  return (
    <div className="flex">
      {rowData.map((cellData, i)=>(
        <Cell key={i} position={i} cellData={cellData} />
      ))}
      {/* <Cell position={0} />
      <Cell position={1} />
      <Cell position={2} />
      <Cell position={3} />
      <Cell position={4} /> */}
    </div>
  );
};

export default Row;
