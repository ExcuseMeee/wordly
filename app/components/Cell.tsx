type ComponentProps = {
  position: number;
  letter: string;
};

const Cell = ({ position, letter }: ComponentProps) => {
  return <div className="border w-12 h-12">{letter}</div>;
};

export default Cell;
