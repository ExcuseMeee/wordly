import { useWordly } from "../context/WordlyContext";

type ComponentProps = {
  key_: string;
};

const Key = ({ key_ }: ComponentProps) => {
  const { addLetter } = useWordly();

  return (
    <div
      className="border w-12 h-12 hover:cursor-pointer flex justify-center items-center"
      onClick={() => {
        addLetter(key_);
      }}
    >
      {key_.toUpperCase()}
    </div>
  );
};
export default Key;
