import fs from "node:fs/promises"
import Grid from "./components/Grid";

async function getWord(){
  try {
    const words = await fs.readFile("./word-bank.txt", "utf-8")
    const list = words.split("\n");
    const randIndex = Math.floor(Math.random() * list.length)
    return list.at(randIndex);
    
  } catch (error: any) {
    throw new Error("Word fetching failed");
  }
}

export default async function Home() {
  const word = await getWord();
  return (
    <div>
      {word}
      <Grid />
    </div>
  )
}
