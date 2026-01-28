"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";

import { SHIP_TYPES } from "@/components/battleship/battleship.constants";
import { useShips } from "@/components/battleship/useShips";
import { useGameState } from "@/components/battleship/useGameState";
import { Cell } from "@/components/battleship/Cell";

export default function Battleship() {
  const boardSize = 8;
  const { ships, setShips, shipsSunk, setShipsSunk, generateShipLocations } = useShips(boardSize);
  const { message, setMessage, guesses, setGuesses, fire } = useGameState(setShips, shipsSunk, setShipsSunk);
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to reset the game
  const resetGame = () => {
    setMessage("Battleships!");
    setShips([]);
    setGuesses([]);
    setShipsSunk({ Destroyer: 0, Cruiser: 0, Battleship: 0 });
    generateShipLocations();
    // Clear the input field
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.disabled = false; // Re-enable input when the game resets
    }
  };

  // Process a player's guess
  const processGuess = useCallback(
    (guess: string) => {
      if (Object.values(shipsSunk).every((count, index) => count === SHIP_TYPES[index].count)) {
        return; // Prevent further guesses if all ships are sunk
      }

      const alphabet = "ABCDEFGH";
      const row = alphabet.indexOf(guess.charAt(0));
      const col = parseInt(guess.charAt(1), 10);
      if (row < 0 || row >= boardSize || isNaN(col) || col >= boardSize) {
        return setMessage("Invalid guess. Enter a letter (A-H) and a number (0-7). ");
      }
      const location = `${row}${col}`;
      if (guesses.includes(location)) {
        return setMessage(`${guess} - You already guessed this spot!`);
      }
      setGuesses(prev => [...prev, location]);
      fire(location);
    },
    [guesses, fire, shipsSunk, setGuesses, setMessage]
  );

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
        {/* Row Labels (A-H) */}
        <Cell key={`row-label-${row}`} id={String.fromCharCode(65 + row)} isLabel />

        {/* Game Board Cells */}
        {Array.from({ length: boardSize }).map((_, col) => {
          const cellId = `${row}${col}`;
          const ship = ships.find(ship => ship.locations.includes(cellId));
          const isHit = ship?.hits[ship.locations.indexOf(cellId)] === "hit";
          const isMiss = guesses.includes(cellId) && !isHit;
          const shipImage = isHit && ship ? ship.image : undefined; // Get ship image if it's a hit

          return (
            <Cell
              key={cellId}
              id={cellId}
              isHit={isHit}
              isMiss={isMiss}
              shipImage={shipImage}
              onClick={() => processGuess(`${String.fromCharCode(65 + row)}${col}`)}
            />
          );
        })}
      </div>
    ));
  }, [boardSize, ships, guesses, processGuess]);

  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-center w-full p-4 rounded-md overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/images/battleship/radarbig.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Main Content (Above Video) */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center w-full p-4">
        {/* Game Board (Responsive) */}
        <div className="grid grid-cols-[auto_repeat(8,minmax(0,1fr))] grid-rows-[repeat(9,minmax(0,1fr))] aspect-square w-full max-w-[90vw] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] border border-green-400">
          {/* Row Labels (A-H) and Board cells */}
          {cells}

          {/* Bottom row for Number Labels (0-7) */}
          <div className="bg-gray-400"></div> {/* Empty bottom - left cell for alignment */}
          {Array.from({ length: boardSize }).map((_, col) => (
            <Cell key={`bottom-col-${col}`} id={String(col)} isLabel />
          ))}
        </div>

        {/* Messages & Input Section */}
        <div className="flex flex-col items-center lg:ml-6 mt-4 lg:mt-0 border border-green-400 bg-gray-300 bg-opacity-30 p-4 rounded min-w-[300px] max-w-fit lg:max-w-[330px] h-auto">
          {/* Game Info Text */}
          <div className="flex flex-col items-center text-white text-shadow-md font-bold border border-green-400 bg-gray-700 p-4 rounded">
            <p className="lg:hidden text-lg mb-2">Click on cells to <span className="text-red-600 text-2xl">FIRE!</span></p>
            <p className="text-lg">2 hits for a Destroyer, 3 for a Cruiser, and 4 for a Battleship. Sink all ships to win!</p>

            {/* Ships Sunk Counter */}
            <p className="text-lg mt-2">Ships Sunk:</p>
            <div className="flex flex-row gap-4">
              {
                Object.entries(shipsSunk).map(([ship, count]) => (
                  <p key={ship} className={count === SHIP_TYPES.find(s => s.name === ship)?.count ? "text-red-500" : ""}>
                    <span className="text-2xl">
                      {ship[0]}: {count} / {SHIP_TYPES.find(s => s.name === ship)?.count}
                    </span>
                  </p>
                ))
              }
            </div>
          </div>

          {/* Show Input & Fire button ONLY on large screens and above */}
          <div className="hidden lg:flex flex-row items-center justify-between gap-4 mt-4" >
            <input 
              ref={inputRef} 
              type="text" 
              id="battleship-guess"
              name="battleship-guess"
              placeholder="A0..." 
              className="w-[50%] p-3 bg-gray-700 text-green-400 border border-white uppercase"
              disabled={Object.values(shipsSunk).every((count, index) => count === SHIP_TYPES[index].count)} // Disable input if all ships are sunk
            />
            <button
              className="p-3 w-[120px] bg-gradient-to-b from-red-600 to-red-800 text-white font-bold rounded-lg border border-red-900 shadow-[0_4px_0_#222] hover:shadow-[0_6px_6px_rgba(0,0,0,0.5)] transition-all transform active:translate-y-[2px] active:shadow-[0_2px_2px_rgba(0,0,0,0.5)]" 
              onClick={() => processGuess(inputRef.current?.value.toUpperCase() || "")}
            >
              FIRE!
            </button>
          </div>

          {/* Display Messages */}
          <div className="w-full max-w-[305px] h-[75px] text-green-400 font-bold text-lg bg-gray-700 p-2 rounded border-green-400 border mt-4 text-center flex items-center justify-center">
            {message}
          </div>

          <button
            className="mt-4 p-3 w-[120px] bg-gradient-to-b from-gray-300 to-gray-500 text-[var(--color-primary)] font-bold rounded-lg border border-gray-700 shadow-[0_4px_0_#222] hover:shadow-[0_6px_6px_rgba(0,0,0,0.5)] transition-all transform active:translate-y-[2px] active:shadow-[0_2px_2px_rgba(0,0,0,0.5)]" onClick={resetGame}
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
