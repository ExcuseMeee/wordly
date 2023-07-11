import { useEffect, useRef, useState } from "react";
import { CellData } from "../context/WordlyContext";
import { AnimationTiming } from "../page";

type ComponentProps = {
  cellData: CellData;
  index: number;
  animationTiming: AnimationTiming;
};

const Cell = ({ cellData, index, animationTiming }: ComponentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { flipDelay, flipDuration, pulseDuration } = animationTiming;
  const delay_ = index * flipDelay;

  const [animation, setAnimation] = useState("");
  const [animationDuration, setAnimationDuration] = useState(0);
  const [color, setColor] = useState("bg-none");

  // removes animation classname after animation finishes, to prevent animation clashing
  useEffect(() => {
    if (animation === "") return;
    setTimeout(() => {
      setAnimation("");
      setAnimationDuration(0);
    }, animationDuration);
  }, [animation]);


  // when a letter is entered, play pulsing animation
  useEffect(() => {
    if (cellData.letter === "") return;
    ref.current?.style.setProperty("--pulseDuration", `${pulseDuration}ms`)
    setAnimation("pulse");
    setAnimationDuration(pulseDuration);
  }, [cellData.letter]);


  // play flipping animation when cellData.state changes
  // cellData.state changes when (1): board is reset (2): user has submitted a valid guess
  useEffect(() => {
    // reset cell color when board is reset, and prevent flipping animation
    if (cellData.state === "None") {
      setColor("bg-none");
      return;
    }
    
    // flipping animation
    ref.current?.style.setProperty("--delay", `${delay_}ms`);
    ref.current?.style.setProperty("--duration", `${flipDuration}ms`);
    setAnimation("flip");
    setAnimationDuration(4 * flipDelay + flipDuration);

    // color cells when flipping animation is halfway through
    setTimeout(() => {
      cellData.state === "Correct"
        ? setColor("bg-green-500")
        : cellData.state === "Close"
        ? setColor("bg-yellow-500")
        : cellData.state === "Incorrect"
        ? setColor("bg-gray-500")
        : setColor("bg-none");
    }, delay_ + flipDuration / 2);
  }, [cellData.state]);

  const cellBorder = cellData.letter ? "border-black" : "";

  return (
    <div
      className={`border-2 ${cellBorder} w-14 h-14 m-0.5 flex justify-center items-center font-bold select-none ${animation} ${color}`}
      ref={ref}
    >
      {cellData.letter.toUpperCase()}
    </div>
  );
};

export default Cell;
