import KeyBoardRow from "./KeyBoardRow";
import { AnimationTiming } from "../page";

type ComponentProps = {
  animationTiming: AnimationTiming;
};

const Keyboard = ({ animationTiming }: ComponentProps) => {

  return (
    <div className="flex flex-col items-center">
      <KeyBoardRow
        keys={["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]}
        animationTiming={animationTiming}
      />
      <KeyBoardRow
        keys={["a", "s", "d", "f", "g", "h", "j", "k", "l"]}
        animationTiming={animationTiming}
      />
      <KeyBoardRow
        keys={["Enter", "z", "x", "c", "v", "b", "n", "m", "Delete"]}
        animationTiming={animationTiming}
      />
    </div>
  );
};
export default Keyboard;
