import Cell from "./Cell"

const Row = () => {
  return (
    <div className="flex">
      <Cell position={0} />
      <Cell position={1} />
      <Cell position={2} />
      <Cell position={3} />
      <Cell position={4} />

    </div>
  )
}

export default Row
