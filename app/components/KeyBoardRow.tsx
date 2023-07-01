import Key from "./Key";

type ComponentProps = {
  keys: string[];
};

const KeyBoardRow = ({ keys }: ComponentProps) => {
  return (
    <div className="flex">
      {keys.map((key_, i) => (
        <Key key={i} key_={key_} />
      ))}
    </div>
  );
};
export default KeyBoardRow;
