import { useState, useCallback } from "react";
import { SHIP_TYPES } from "@/components/battleship/battleship.constants";
import { Ship } from "@/components/battleship/battleship.types";

export function useGameState(
  setShips: React.Dispatch<React.SetStateAction<Ship[]>>,
  shipsSunk: { Destroyer: number; Cruiser: number; Battleship: number }, 
  setShipsSunk: (sunk: { Destroyer: number; Cruiser: number; Battleship: number }) => void
) {
  const [message, setMessage] = useState("Battleships!");
  const [guesses, setGuesses] = useState<string[]>([]);

  const fire = useCallback(
    (guess: string) => {
      setShips((prevShips) => {
        let hit = false;
        const newShipsSunk = { ...shipsSunk };
        let shipSunkMessage = "";

        const updatedShips = prevShips.map((ship: Ship) => {
          const hitIndex = ship.locations.indexOf(guess);
          if (hitIndex >= 0) {
            const newHits = [...ship.hits];
            newHits[hitIndex] = "hit";
            hit = true;

            if (newHits.every(h => h === "hit")) {
              const shipType = ship.name as keyof typeof shipsSunk;
              newShipsSunk[shipType] += 1;
              shipSunkMessage = `You've sunk a ${ship.name}!`;
            }

            return { ...ship, hits: newHits };
          }
          return ship;
        });

        setShipsSunk(newShipsSunk);

        const allSunk = Object.entries(newShipsSunk).every(([ship, count]) => count === SHIP_TYPES.find(s => s.name === ship)?.count);

        let message;
        if (allSunk) {
          message = `You sank all ships in ${guesses.length + 1} guesses! Game Over!`;
        } else if (hit) {
          message = shipSunkMessage || "HIT!!";
        } else {
          message = "You missed.";
        }
        setMessage(message);

        return updatedShips;
      });
    },
    [shipsSunk, guesses.length, setShips, setShipsSunk, setMessage]
  );

  return { message, setMessage, guesses, setGuesses, fire };
}
