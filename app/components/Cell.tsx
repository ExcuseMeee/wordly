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

  const [color, setColor] = useState("bg-none");
  const [border, setBorder] = useState(true);

  const [pulse, setPulse] = useState(false);
  const [flip, setFlip] = useState(false);

  // removes animation classname after animation finishes
  useEffect(() => {
    if (!pulse) return;
    setTimeout(() => {
      setPulse(false);
    }, pulseDuration);
  }, [pulse]);
  useEffect(() => {
    if (!flip) return;
    setTimeout(() => {
      setFlip(false);
    }, delay_ + flipDuration);
  }, [flip]);

  // when a letter is entered, play pulsing animation
  useEffect(() => {
    if (cellData.letter === "") return;
    ref.current?.style.setProperty("--pulseDuration", `${pulseDuration}ms`);
    setPulse(true);
  }, [cellData.letter]);

  // play flipping animation when cellData.state changes
  // cellData.state changes when (1): board is reset (2): user has submitted a valid guess
  useEffect(() => {
    // reset cell color and border when board is reset, and prevent flipping animation
    if (cellData.state === "None") {
      setColor("bg-none");
      setBorder(true);
      return;
    }

    // flipping animation
    ref.current?.style.setProperty("--delay", `${delay_}ms`);
    ref.current?.style.setProperty("--duration", `${flipDuration}ms`);
    setPulse(false); // to prevent clashing
    setFlip(true);

    // color cells and remove border when flipping animation is halfway through
    setTimeout(() => {
      setBorder(false);
      cellData.state === "Correct"
        ? setColor("bg-green-500")
        : cellData.state === "Close"
        ? setColor("bg-yellow-500")
        : cellData.state === "Incorrect"
        ? setColor("bg-zinc-700")
        : setColor("bg-none");
    }, delay_ + flipDuration / 2);
  }, [cellData.state]);

  const borderColor = cellData.letter ? "border-white/70" : "border-white/40";
  const cellBorder = border ? `border-2 ${borderColor}` : "";
  const pulseAnim = pulse ? "pulse" : "";
  const flipAnim = flip ? "flip" : "";

  return (
    <div
      className={`${cellBorder} ${pulseAnim} ${flipAnim} ${color} 
      md:w-16 md:h-16 w-14 h-14 m-0.5 flex justify-center items-center text-2xl font-bold select-none text-white`}
      ref={ref}
    >
      {cellData.letter.toUpperCase()}
    </div>
  );
};

export default Cell;
