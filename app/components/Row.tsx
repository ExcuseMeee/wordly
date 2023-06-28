import Cell from "./Cell";
type ComponentProps = {
  rowData: string[];
};

const Row = ({ rowData }: ComponentProps) => {
  return (
    <div className="flex">
      {rowData.map((letter, i)=>(
        <Cell key={i} position={i} letter={letter} />
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
