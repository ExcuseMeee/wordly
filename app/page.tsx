import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";

// timing in millisec
export type AnimationTiming = {
  delay: number;
  duration: number;
  shudderDuration: number;
}

export default async function Home() {

  const animationTiming: AnimationTiming = {
    // cell flipping, total time to flip all cells is 4*delay + duration
    delay: 400,
    duration: 800,
    // shaking duration
    shudderDuration: 300,
  }

  return (
    <div>
      <Grid animationTiming={animationTiming} />
      <Keyboard animationTiming={animationTiming} />
    </div>
  );
}
