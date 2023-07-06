import { RefObject } from "react";
import { useWordly } from "../context/WordlyContext";

type ComponentProps = {
  modalRef: RefObject<HTMLDialogElement>;
};

const GameOver = ({ modalRef }: ComponentProps) => {
  const { solved, word } = useWordly();

  return (
    <div>
      <div>MESSAGE</div>
      <div>The word was: {word}</div>
      <button onClick={() => modalRef.current?.close()}>Close</button>
    </div>
  );
};
export default GameOver;
