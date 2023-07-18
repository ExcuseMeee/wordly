"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  MutableRefObject,
} from "react";

type ContextTypes = {
  word: string;
  board: CellData[][];
  addLetter: Function;
  usedLetters: MutableRefObject<Map<string, CellState>>;
  submitGuess: Function;
  deleteLetter: Function;
  gameFinished: boolean;
  resetWordly: Function;
  solved: boolean;
  currentTurn: number;
  currentPosition: number;
  shudder: boolean;
  setShudder: Function;
};
export type CellData = {
  letter: string;
  state: CellState;
};
type CellState = "None" | "Incorrect" | "Close" | "Correct";

const WordlyContext = createContext<ContextTypes>(null!);

export const WordlyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
  const [solved, setSolved] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const usedLetters = useRef<Map<string, CellState>>(new Map());

  const [isFetching, setIsFetching] = useState(false); // prevent actions when api call is in progress (for slow internet)

  const [shudder, setShudder] = useState<boolean>(false);

  // fetch word on first render
  useEffect(() => {
    setIsFetching(true);
    fetch("/api")
      .then((res) => {
        return res.json();
      })
      .then((word: string) => {
        setWord(word);
        setIsFetching(false);
      });
  }, []);

  // track and handle keystrokes
  useEffect(() => {
    document.addEventListener("keyup", keyHandler);

    return () => {
      document.removeEventListener("keyup", keyHandler);
    };
  }, [keyHandler]);
  function keyHandler(event: KeyboardEvent) {
    if (gameFinished || isFetching) return;
    if (event.key === "Backspace") {
      deleteLetter();
    } else if (event.key === "Enter") {
      submitGuess();
    } else if (/^[A-Za-z]$/.test(event.key)) {
      addLetter(event.key);
    }
  }

  // win or lose check
  useEffect(() => {
    if (currentTurn > 5 && !solved) {
      setGameFinished(true);
    } else if (solved) {
      setGameFinished(true);
    }
  }, [solved, currentTurn]);

  // ----------------------GAMEBOARD UPDATING----------------------
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
    if (isFetching) return;
    if (currentPosition === 0) return;
    updateBoard("", currentTurn, currentPosition - 1);
    setCurrentPosition((currentPosition) => currentPosition - 1);
  }
  function addLetter(key: string) {
    if (isFetching) return;
    if (currentPosition === 5 || currentTurn === 6 || gameFinished) return;
    updateBoard(key, currentTurn, currentPosition);
    setCurrentPosition((currentPosition) => currentPosition + 1);
  }
  function updateUsedLetters(letter: string, cellState: CellState) {
    if (usedLetters.current.get(letter) === "Correct") return;
    usedLetters.current.set(letter, cellState);
  }
  function resetWordly() {
    setIsFetching(true)
    fetch("/api")
      .then((res) => {
        return res.json();
      })
      .then((word: string) => {
        setWord(word);
        setIsFetching(false)
      });
      resetStates();
  }
  function resetStates() {
    setBoard(
      Array<CellData[]>(6).fill(
        Array<CellData>(5).fill({
          letter: "",
          state: "None",
        })
      )
    );
    setCurrentPosition(0);
    setCurrentTurn(0);
    usedLetters.current.clear();
    setSolved(false);
    setGameFinished(false);
  }

  // ----------------------WORD CHECKING----------------------
  async function submitGuess() {
    if (isFetching) return;
    if (currentPosition !== 5) return; // don't submit unless 5 letters are entered
    let currentGuess = board.at(currentTurn)!;
    if (!(await wordExists(currentGuess))) return;
    const tempBoard: CellData[][] = board.map((row) =>
      row.map((cell) => ({ ...cell }))
    );
    const { returnArr: result, solved } = check(currentGuess, word);
    tempBoard[currentTurn] = result;
    setBoard(tempBoard);
    setCurrentTurn((currentTurn) => currentTurn + 1);
    setCurrentPosition(0);
    setSolved(solved);
  }
  // map through each letter of submitted guess to determine if each letter is Correct, Close, or Incorrect.
  // returns array of cellData with cellState updated to match results
  // returns whether the wordly is solved or not
  function check(
    guess: CellData[],
    word: string
  ): { returnArr: CellData[]; solved: boolean } {
    let solved = true;
    let returnArr: CellData[] = [];
    const wordArr: string[] = word.trim().toLowerCase().split("");

    guess.forEach((cell, i) => {
      const guessLetter = cell.letter.toLowerCase();
      const wordLetter = wordArr.at(i);
      const cellState: CellState =
        guessLetter === wordLetter
          ? "Correct"
          : wordArr.includes(guessLetter)
          ? "Close"
          : "Incorrect";

      returnArr.push({
        letter: guessLetter,
        state: cellState,
      });

      updateUsedLetters(guessLetter, cellState);
      if (guessLetter !== wordLetter) solved = false;
    });

    return { returnArr, solved };
  }
  // api call to search word banks for submitted guess
  // updates isFetching state to prevent multiple submits while api is being called
  async function wordExists(guess: CellData[]): Promise<boolean> {
    setIsFetching(true);
    let guessString: string = guess.map((cell) => cell.letter).join("");
    const res = await fetch("/api", {
      method: "POST",
      body: guessString,
    });
    if (res.status === 500) {
      console.error("Word search failed");
      setShudder(true);
      setIsFetching(false);
      return false;
    }
    const doesExist: boolean = await res.json();
    setIsFetching(false);
    setShudder(!doesExist);
    return doesExist;
  }

  return (
    <WordlyContext.Provider
      value={{
        word,
        board,
        addLetter,
        usedLetters,
        submitGuess,
        deleteLetter,
        gameFinished,
        resetWordly,
        solved,
        currentTurn,
        shudder,
        setShudder,
        currentPosition,
      }}
    >
      {children}
    </WordlyContext.Provider>
  );
};

export const useWordly = () => {
  return useContext(WordlyContext);
};
