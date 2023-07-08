import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";

export default async function Home() {

  // timing in millisec, total time to flip all cells is 4*delay + duration
  const animationTiming = {
    delay: 400,
    duration: 800,
  }

  return (
    <div>
      <Grid animationTiming={animationTiming} />
      <Keyboard animationTiming={animationTiming} />
    </div>
  );
}
