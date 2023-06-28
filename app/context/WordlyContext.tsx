"use client";
import { createContext, useContext, useEffect, useState } from "react";

type ContextTypes = {
  word: string;
  board: string[][];
};

const WordlyContext = createContext<ContextTypes>(null!);

export const WordlyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    fetch("/api")
      .then((res) => {
        return res.json();
      })
      .then((word: string) => {
        console.log(word);
        setWord(word);
      });
  }, []);

  useEffect(()=>{
    document.addEventListener("keyup", keyHandler)

    return ()=>{
      document.removeEventListener("keyup", keyHandler)
    }
  }, [keyHandler])

  function keyHandler(event: KeyboardEvent){
    console.log(event.key)
    setCurrentPosition(currentPosition=> currentPosition+1)
    console.log(currentTurn, currentPosition)
    updateBoard(event.key);
  }

  function updateBoard(letter: string){
    const tempBoard = board.map(row => [...row]);
    tempBoard[currentTurn][currentPosition] = letter;
    setBoard(tempBoard)
  }

  const [word, setWord] = useState("");
  const [board, setBoard] = useState<string[][]>([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [currentTurn, setCurrentTurn] = useState(0)
  const [currentPosition, setCurrentPosition] = useState(0)

  return (
    <WordlyContext.Provider value={{ word, board }}>
      {children}
    </WordlyContext.Provider>
  );
};

export const useWordly = () => {
  return useContext(WordlyContext);
};
