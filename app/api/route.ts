import fs from "node:fs/promises";
import { NextResponse } from "next/server";
import path from "node:path";

export async function GET() {
  try {
    const file = path.join(process.cwd(), "word-bank.txt")
    const words = await fs.readFile(file, "utf-8");
    const list = words.split("\n").map((word) => word.trim());
    const randIndex = Math.floor(Math.random() * list.length);
    return NextResponse.json(list.at(randIndex), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Word fetch failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const file = path.join(process.cwd(), "word-bank.txt")
    const additionalFile = path.join(process.cwd(), "allowed-guesses.txt")
    const words = await fs.readFile(file, "utf-8");
    const additional = await fs.readFile(additionalFile, "utf-8");

    const list = words.split("\n").map((word) => word.trim());
    const additionalList = additional.split("\n").map((word) => word.trim());

    const guess: string = (await request.text()).toLowerCase().trim();
    const wordExists = list.includes(guess) || additionalList.includes(guess);
    return NextResponse.json(wordExists, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Word search failed" }, { status: 500 });
  }
}
