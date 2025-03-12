"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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
    const newShips: Ship[] = [];
    for (let i = 0; i < numShips; i++) {
      let locations: string[];
      do {
        locations = generateShip();
      } while (collision(locations, newShips));
      newShips.push({ locations, hits: Array(shipLength).fill("") });
    }
    setShips(newShips);
  }, [generateShip, collision, numShips, shipLength]);

  useEffect(() => {
    generateShipLocations();
  }, [generateShipLocations]);

  // Handle a hit or miss
  const fire = useCallback(
    (guess: string) => {
      if (shipsSunk === numShips) return;

      let hit = false;
      let newShipsSunk = shipsSunk;
      let shipSunkMessage = "";

      const updatedShips = ships.map((ship) => {
        const hitIndex = ship.locations.indexOf(guess);
        if (hitIndex >= 0) {
          const newHits = [...ship.hits];
          newHits[hitIndex] = "hit";
          hit = true;

          // Check if ship is fully sunk
          if (newHits.every((h) => h === "hit")) {
            newShipsSunk += 1;
            shipSunkMessage = `You hit this battleship 3 times and sank my ship! ${numShips - newShipsSunk} left.`;
          }

          return { ...ship, hits: newHits };
        }
        return ship;
      });

      // Update state AFTER processing all logic
      setShips(updatedShips);
      setShipsSunk(newShipsSunk);

      // Set the correct message **before** updating state
      if (hit) {
        if (shipSunkMessage) {
          if (newShipsSunk === numShips) {
            setMessage(`You sank all ${numShips} battleships in ${guesses.length + 1} guesses! Game Over!`);
          } else {
            setMessage(shipSunkMessage);
          }
        } else {
          setMessage("HIT!!");
        }
      } else {
        setMessage("You missed.");
      }
    },
    [ships, shipsSunk, numShips, guesses.length]
  );

  // Process a player's guess
  const processGuess = useCallback((guess: string) => {
    if (shipsSunk === numShips) return;

    const alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    const row = alphabet.indexOf(guess.charAt(0));
    const col = parseInt(guess.charAt(1), 10);

    if (row < 0 || row >= boardSize || isNaN(col) || col >= boardSize) {
      setMessage("Invalid guess. Enter a letter (A-G) and a number (0-6).");
      return;
    }

    const location = `${row}${col}`;
    if (guesses.includes(location)) {
      setMessage(`${guess} - You already guessed this spot!`);
      return;
    }

    setGuesses((prev) => [...prev, location]);
    fire(location);

    if (inputRef.current) {
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

  return (
    <div className="flex flex-col lg:flex-row items-center p-0 py-4 lg:p-6 bg-cover bg-center w-full rounded-md"
      style={{ backgroundImage: "url(/images/battleship/radarbig.gif)" }}
    >
      {/* Game Board (Responsive) */}
      <table className="border border-green-400 w-full max-w-[90%] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px]">
        <tbody>
          {Array.from({ length: boardSize }).map((_, row) => (
            <tr key={row}>
              <Cell id={String.fromCharCode(65 + row)} isLabel />
              {Array.from({ length: boardSize }).map((_, col) => {
                const cellId = `${row}${col}`;
                const isHit = ships.some((ship) => ship.locations.includes(cellId) && ship.hits[ship.locations.indexOf(cellId)] === "hit");
                const isMiss = guesses.includes(cellId) && !isHit;
                return (
                  <Cell key={cellId} id={cellId} isHit={isHit} isMiss={isMiss} onClick={() => processGuess(`${String.fromCharCode(65 + row)}${col}`)} />
                );
              })}
            </tr>
          ))}
          <tr>
            <Cell id="empty" isLabel text="" />
            {Array.from({ length: boardSize }).map((_, col) => (
              <Cell key={col} id={String(col)} isLabel />
            ))}
          </tr>
        </tbody>
      </table>

      {/* Messages & Input Section */}
      <div className="flex flex-col items-center lg:ml-6 mt-4 lg:mt-0 border border-green-400 bg-gray-300 bg-opacity-30 p-4 rounded min-w-[300px] max-w-[320px] h-[390px]">
        {/* Game Info Text */}
        <div className="flex flex-col items-center text-white text-shadow-md font-bold border border-green-400 bg-gray-700 p-4 rounded mb-4">
          <p className="text-lg mb-2">3 hits to sink each ship! Sink 3 ships to win!</p>
          <p className="text-lg">Ships Sunk: <span className="text-2xl">{shipsSunk} / {numShips}</span></p>
        </div>

        {/* Guess Input and Fire Button in a Row */}
        <div className="flex flex-row items-center justify-between gap-4">
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
        <div className="w-full max-w-[286px] h-[75px] text-green-400 font-bold text-lg bg-gray-700 p-2 rounded border-green-400 border mt-4">
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

// Cell Component
const Cell = ({ id, isHit, isMiss, isLabel, text, onClick }: CellProps) => (
  <td 
    className={`border w-12 h-12 md:w-16 md:h-16 text-center text-lg md:text-2xl font-bold ${
      isLabel ? "bg-gray-400 text-black" // Label cells (letters/numbers)
      : isHit ? "bg-red-500 bg-opacity-50 text-white text-shadow-md bg-[url('/images/battleship/cruiser.png')] bg-contain bg-center bg-no-repeat" // Hit cells
      : isMiss ? "bg-transparent text-green-400 text-shadow-md" : "bg-gray-300 bg-opacity-30" // Missed cells
    }`} 
    onClick={onClick}
  >
    {
      isLabel ? 
      text || id !== "empty" ? id : "" 
      : isHit ? "HIT" 
      : isMiss ? "MISS" : ""
    }
  </td>
);