import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";

// timing in millisec
export type AnimationTiming = {
  flipDelay: number;
  flipDuration: number;
  shudderDuration: number;
  pulseDuration: number;
}

export default async function Home() {

  const animationTiming: AnimationTiming = {
    flipDelay: 300,
    flipDuration: 600, // total time to flip all cells is 4*flipDelay + flipDuration
    shudderDuration: 300,
    pulseDuration: 100
  }

  return (
    <div>
      <Grid animationTiming={animationTiming} />
      <Keyboard animationTiming={animationTiming} />
    </div>
  );
}
