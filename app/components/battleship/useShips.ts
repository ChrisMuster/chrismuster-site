import { useState, useCallback, useEffect } from "react";
import { Ship } from "@/components/battleship/battleship.types";
import { SHIP_TYPES } from "@/components/battleship/battleship.constants";

export function useShips(boardSize: number) {
  const [ships, setShips] = useState<Ship[]>([]);
  const [shipsSunk, setShipsSunk] = useState({ Destroyer: 0, Cruiser: 0, Battleship: 0 });

  // Generate a random ship
  const generateShip = useCallback((size: number): string[] => {
    const direction = Math.random() < 0.5;
    let row, col;
    if (direction) {
      // Horizontal
      row = Math.floor(Math.random() * boardSize);
      col = Math.floor(Math.random() * (boardSize - size + 1));
    } else {
      // Vertical
      row = Math.floor(Math.random() * (boardSize - size + 1));
      col = Math.floor(Math.random() * boardSize);
    }
    return Array.from({ length: size }, (_, i) => (direction ? `${row}${col + i}` : `${row + i}${col}`));
  }, [boardSize]);

  // Check for ship collisions
  const collision = useCallback(
    (locations: string[], newShips: Ship[]) => newShips.some(ship => ship.locations.some(loc => locations.includes(loc))),
    []
  );

  // Generate ships at the start of the game
  const generateShipLocations = useCallback(() => {
    setShips(() =>
      SHIP_TYPES.reduce<Ship[]>((acc, { name, size, count, image }) => {
        const ships = Array.from({ length: count }, () => {
          let locations: string[];
          do {
            locations = generateShip(size);
          } while (collision(locations, acc)); // Check against accumulated ships

          return { name, locations, hits: Array(size).fill(""), image };
        });

        return [...acc, ...ships]; // Append new ships to accumulated list
      }, [])
    );
  }, [generateShip, collision]);

  useEffect(() => {
    generateShipLocations();
  }, [generateShipLocations]);

  return { ships, setShips, shipsSunk, setShipsSunk, generateShipLocations };
}
