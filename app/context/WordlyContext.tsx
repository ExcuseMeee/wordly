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

  useEffect(() => {
    document.addEventListener("keyup", keyHandler);

    return () => {
      document.removeEventListener("keyup", keyHandler);
    };
  }, [keyHandler]);

  function keyHandler(event: KeyboardEvent) {
    if (event.key === "Backspace") {
      deleteLetter();
    } else if (event.key === "Enter") {
      console.log("enter");
    } else if(/^[A-Za-z]$/.test(event.key)){
      addLetter(event.key)
    }else {
      console.log("invalid keystroke", event.key)
    }
  }

  function updateBoard(letter: string, turn: number, position: number) {
    // console.log("updating", turn, position);
    const tempBoard = board.map((row) => [...row]);
    tempBoard[turn][position] = letter;
    setBoard(tempBoard);
  }

  function deleteLetter() {
    if (currentPosition === 0) return;
    updateBoard("", currentTurn, currentPosition - 1);
    setCurrentPosition((currentPosition) => currentPosition - 1);
  }

  function addLetter(key: string) {
    if (currentPosition === 5) return;
    updateBoard(key, currentTurn, currentPosition);
    setCurrentPosition((currentPosition) => currentPosition + 1);
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
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);

  return (
    <WordlyContext.Provider value={{ word, board }}>
      {children}
    </WordlyContext.Provider>
  );
};

export const useWordly = () => {
  return useContext(WordlyContext);
};
