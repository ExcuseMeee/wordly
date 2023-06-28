import fs from "node:fs/promises";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const words = await fs.readFile("./word-bank.txt", "utf-8");
    const list = words.split("\n");
    const randIndex = Math.floor(Math.random() * list.length);
    return NextResponse.json(list.at(randIndex)?.trim(), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Word fetch failed" }, { status: 500 });
  }
}