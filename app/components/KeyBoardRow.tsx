import { AnimationTiming } from "../page";
import Key from "./Key";

type ComponentProps = {
  keys: string[];
  animationTiming: AnimationTiming;
};

const KeyBoardRow = ({ keys, animationTiming }: ComponentProps) => {
  return (
    <div className="flex">
      {keys.map((key_, i) => (
        <Key key={i} key_={key_} animationTiming={animationTiming} />
      ))}
    </div>
  );
};
export default KeyBoardRow;
