"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Ship, CellProps } from "@/components/battleship/battleship.types";

export default function Battleship() {
  const boardSize = 7;
  const numShips = 3;
  const shipLength = 3;

  // Game state
  const [message, setMessage] = useState("Battleships!");
  const [ships, setShips] = useState<Ship[]>([]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [shipsSunk, setShipsSunk] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to reset the game
  const resetGame = () => {
    setMessage("Battleships!");
    setShips([]);
    setGuesses([]);
    setShipsSunk(0);
    generateShipLocations();

    // Clear the input field
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Generate a random ship
  const generateShip = useCallback((): string[] => {
    const direction = Math.random() < 0.5; // Horizontal: true, Vertical: false
    let row, col;

    if (direction) {
      // Horizontal
      row = Math.floor(Math.random() * boardSize);
      col = Math.floor(Math.random() * (boardSize - shipLength + 1));
    } else {
      // Vertical
      row = Math.floor(Math.random() * (boardSize - shipLength + 1));
      col = Math.floor(Math.random() * boardSize);
    }

    return Array.from({ length: shipLength }, (_, i) =>
      direction ? `${row}${col + i}` : `${row + i}${col}`
    );
  }, [boardSize, shipLength]);

  // Check for ship collisions
  const collision = useCallback(
    (locations: string[], newShips: Ship[]) => {
      return newShips.some((ship) =>
        ship.locations.some((loc) => locations.includes(loc))
      );
    },
    []
  );

  // Generate ships at the start of the game
  const generateShipLocations = useCallback(() => {
    setShips(() => {
      const newShips: Ship[] = [];
      while (newShips.length < numShips) {
        let locations: string[];
        do {
          locations = generateShip();
        } while (collision(locations, newShips));
        newShips.push({ locations, hits: Array(shipLength).fill("") });
      }
      return newShips;
    });
  }, [generateShip, collision, numShips, shipLength]);

  useEffect(() => {
    generateShipLocations();
  }, [generateShipLocations]);

  // Handle a hit or miss
  const fire = useCallback(
    (guess: string) => {
      if (shipsSunk === numShips) return; // Stop the game if all ships are sunk

      setShips((prevShips) => {
        let hit = false;
        let newShipsSunk = shipsSunk;
        let shipSunkMessage = "";

        const updatedShips = prevShips.map((ship) => {
          const hitIndex = ship.locations.indexOf(guess);
          if (hitIndex >= 0) {
            const newHits = [...ship.hits];
            newHits[hitIndex] = "hit";
            hit = true;

            if (newHits.every((h) => h === "hit")) {
              newShipsSunk += 1;
              shipSunkMessage = `You hit this battleship 3 times and sank my ship! ${numShips - newShipsSunk} left.`;
            }

            return { ...ship, hits: newHits };
          }
          return ship;
        });

        // Update state inside setShips to ensure we have the latest values
        setShipsSunk(newShipsSunk);
        setMessage(
          hit
            ? newShipsSunk === numShips
              ? `You sank all ${numShips} battleships in ${guesses.length + 1} guesses! Game Over!`
              : shipSunkMessage || "HIT!!"
            : "You missed."
        );

        return updatedShips; // Return updated ships state
      });
    },
    [shipsSunk, numShips, guesses.length]
  );

  // Process a player's guess
  const processGuess = useCallback((guess: string) => {
    if (shipsSunk === numShips) return;

    const alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    const row = alphabet.indexOf(guess.charAt(0));
    const col = parseInt(guess.charAt(1), 10);

    if (row < 0 || row >= boardSize || isNaN(col) || col >= boardSize) {
      return setMessage("Invalid guess. Enter a letter (A-G) and a number (0-6).");
    }

    const location = `${row}${col}`;
    if (guesses.includes(location)) {
      return setMessage(`${guess} - You already guessed this spot!`);
    }

    setGuesses((prev) => [...prev, location]);
    fire(location);

    if (inputRef.current && window.innerWidth >= 1024) {
      inputRef.current.focus();
    }
  }, [boardSize, guesses, fire, shipsSunk, numShips]);

  // Handle Enter Key Press
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && inputRef.current) {
        processGuess(inputRef.current.value.toUpperCase());
        inputRef.current.value = "";
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [processGuess]);

  const cells = useMemo(() => {
    return Array.from({ length: boardSize }).map((_, row) => (
      <div key={`row-${row}`} className="contents">
        {/* Row Labels (A-G) */}
        <Cell key={`row-label-${row}`} id={String.fromCharCode(65 + row)} isLabel />

        {/* Game Board Cells */}
        {Array.from({ length: boardSize }).map((_, col) => {
          const cellId = `${row}${col}`;
          const isHit = ships.some(
            (ship) => ship.locations.includes(cellId) && ship.hits[ship.locations.indexOf(cellId)] === "hit"
          );
          const isMiss = guesses.includes(cellId) && !isHit;

          return (
            <Cell
              key={cellId}
              id={cellId}
              isHit={isHit}
              isMiss={isMiss}
              onClick={() => processGuess(`${String.fromCharCode(65 + row)}${col}`)}
            />
          );
        })}
      </div>
    ));
  }, [boardSize, ships, guesses, processGuess]);


  return (
    <div className="flex flex-col lg:flex-row items-center justify-center w-full p-4 bg-cover bg-center rounded-md"
      style={{ backgroundImage: "url(/images/battleship/radarbig.gif)" }}
    >
      {/* Game Board (Responsive) */}
      <div className="grid grid-cols-[auto_repeat(7,minmax(0,1fr))] grid-rows-[repeat(8,minmax(0,1fr))] aspect-square w-full max-w-[90vw] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] border border-green-400">
        {/* Row Labels (A-G) and Board cells */}
        {cells}

        {/* Bottom row for Number Labels (0-6) */}
        <div className="bg-gray-400"></div> {/* Empty bottom-left cell for alignment */}
        {Array.from({ length: boardSize }).map((_, col) => (
          <Cell key={`bottom-col-${col}`} id={String(col)} isLabel />
        ))}
      </div>

      {/* Messages & Input Section */}
      <div className="flex flex-col items-center lg:ml-6 mt-4 lg:mt-0 border border-green-400 bg-gray-300 bg-opacity-30 p-4 rounded min-w-[300px] max-w-fit h-auto">
        {/* Game Info Text */}
        <div className="flex flex-col items-center text-white text-shadow-md font-bold border border-green-400 bg-gray-700 p-4 rounded">
          <p className="lg:hidden text-lg mb-2">Click on cells to <span className="text-red-600 text-2xl">FIRE!</span></p>
          <p className="text-lg mb-2">3 hits to sink each ship! Sink 3 ships to win!</p>
          <p className="text-lg">Ships Sunk: <span className="text-2xl">{shipsSunk} / {numShips}</span></p>
        </div>

        {/* Show Input & Fire button ONLY on large screens and above */}
        <div className="hidden lg:flex flex-row items-center justify-between gap-4 mt-4">
          <input ref={inputRef} type="text" placeholder="A0..." className="w-[50%] p-3 bg-gray-700 text-green-400 border border-white uppercase" disabled={shipsSunk === numShips} />
          <button
            className="p-3 w-[120px] bg-gradient-to-b from-red-600 to-red-800 
             text-white font-bold rounded-lg border border-red-900 
             shadow-[0_4px_0_#222] hover:shadow-[0_6px_6px_rgba(0,0,0,0.5)] transition-all transform active:translate-y-[2px] active:shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
            onClick={() => processGuess(inputRef.current?.value.toUpperCase() || "")}
          >
            FIRE!
          </button>
        </div>

        {/* Display Messages */}
        <div className="w-full max-w-[305px] h-[75px] text-green-400 font-bold text-lg bg-gray-700 p-2 rounded border-green-400 border mt-4">
          {message}
        </div>

        <button 
          className="mt-4 p-3 w-[120px] bg-gradient-to-b from-gray-300 to-gray-500 
             text-[var(--color-primary)] font-bold rounded-lg border border-gray-700
             shadow-[0_4px_0_#222] hover:shadow-[0_6px_6px_rgba(0,0,0,0.5)]
             transition-all transform active:translate-y-[2px] active:shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

const getCellText = (isHit: boolean, isMiss: boolean) => {
  if (isHit) return "HIT";
  if (isMiss) return "MISS";
  return "";
};

// Cell Component
const Cell = ({ id, isHit, isMiss, isLabel, text, onClick }: CellProps) => (
  <div
    className={`flex items-center justify-center border border-green-400 
      text-sm sm:text-base md:text-xl xl:text-2xl font-bold aspect-square w-full h-full ${
      isLabel ? "bg-gray-400 text-black"
        : isHit ? "bg-red-500 bg-opacity-50 text-white text-shadow-md bg-[url('/images/battleship/cruiser.png')] bg-contain bg-center bg-no-repeat"
          : isMiss ? "bg-transparent text-green-400 text-shadow-md"
            : "bg-gray-300 bg-opacity-30"
      }`}
    onClick={isLabel ? undefined : onClick}
  >
    {isLabel ? text || id !== "empty" ? id : "" : getCellText(isHit || false, isMiss || false)}
  </div>
);
