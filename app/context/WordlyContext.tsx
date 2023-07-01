"use client";
import { createContext, useContext, useEffect, useState } from "react";

type ContextTypes = {
  word: string;
  board: CellData[][];
  addLetter: Function;
};

export type CellData = {
  letter: string;
  state: "None" | "Incorrect" | "Close" | "Correct";
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
      submitGuess();
    } else if (/^[A-Za-z]$/.test(event.key)) {
      addLetter(event.key);
    } else {
      console.log("invalid keystroke", event.key);
    }
  }

  function updateBoard(letter: string, turn: number, position: number) {
    const tempBoard: CellData[][] = board.map((row) =>
      row.map((cell) => ({ ...cell }))
    );
    tempBoard[turn][position] = {
      letter: letter,
      state: tempBoard[turn][position].state,
    };
    setBoard(tempBoard);
  }

  function deleteLetter() {
    if (currentPosition === 0) return;
    updateBoard("", currentTurn, currentPosition - 1);
    setCurrentPosition((currentPosition) => currentPosition - 1);
  }

  function addLetter(key: string) {
    if (currentPosition === 5 || currentTurn === 6) return;
    updateBoard(key, currentTurn, currentPosition);
    setCurrentPosition((currentPosition) => currentPosition + 1);
  }

  async function submitGuess() {
    if (currentPosition !== 5) return;
    let currentGuess = board.at(currentTurn)!;
    if (!(await wordExists(currentGuess))) {
      console.log("word dne");
      return;
    }
    const tempBoard: CellData[][] = board.map((row) =>
      row.map((cell) => ({ ...cell }))
    );
    const result = check(currentGuess, word);
    tempBoard[currentTurn] = result;
    setBoard(tempBoard);
    setCurrentTurn((currentTurn) => currentTurn + 1);
    setCurrentPosition(0);
  }

  function check(guess: CellData[], word: string) {
    let returnArr: CellData[] = [];
    const wordArr: string[] = word.trim().toLowerCase().split("");
    guess.forEach((cell, i) => {
      const guessLetter = cell.letter.toLowerCase();
      const wordLetter = wordArr.at(i);
      returnArr.push({
        letter: guessLetter,
        state:
          guessLetter === wordLetter
            ? "Correct"
            : wordArr.includes(guessLetter)
            ? "Close"
            : "Incorrect",
      });
    });
    return returnArr;
  }

  async function wordExists(guess: CellData[]): Promise<boolean> {
    let guessString: string = guess.map((cell) => cell.letter).join("");
    const res = await fetch("/api", {
      method: "POST",
      body: guessString,
    });
    if (res.status === 500) {
      console.log("Word search failed");
      return false;
    }
    const doesExist: boolean = await res.json();
    return doesExist;
  }

  const [word, setWord] = useState("");
  const [board, setBoard] = useState(
    Array<CellData[]>(6).fill(
      Array<CellData>(5).fill({
        letter: "",
        state: "None",
      })
    )
  );

  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [usedLetters, setUsedLetters] = useState()

  return (
    <WordlyContext.Provider value={{ word, board, addLetter }}>
      {children}
    </WordlyContext.Provider>
  );
};

export const useWordly = () => {
  return useContext(WordlyContext);
};
