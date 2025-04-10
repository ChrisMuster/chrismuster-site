import { useState, useCallback, useEffect } from "react";
import { Ship } from "@/components/battleship/battleship.types";
import { SHIP_TYPES } from "@/components/battleship/battleship.constants";

export function useShips(boardSize: number) {
  const [ships, setShips] = useState<Ship[]>([]);
  const [shipsSunk, setShipsSunk] = useState({ Destroyer: 0, Cruiser: 0, Battleship: 0 });

  // Generate all ships while avoiding overlap
  const generateShipLocations = useCallback(() => {
    const newShips: Ship[] = [];
    const occupied = new Set<string>();
    const maxAttempts = 1000;

    // generate a single random ship location
    const generateShip = (size: number): string[] => {
      const isHorizontal = Math.random() < 0.5;
      const row = Math.floor(Math.random() * (isHorizontal ? boardSize : boardSize - size + 1));
      const col = Math.floor(Math.random() * (isHorizontal ? boardSize - size + 1 : boardSize));

      return Array.from({ length: size }, (_, i) =>
        isHorizontal ? `${row}${col + i}` : `${row + i}${col}`
      );
    };

    for (const { name, size, count, image } of SHIP_TYPES) {
      let created = 0;
      let attempts = 0;

      // Check for ship collisions
      while (created < count && attempts < maxAttempts) {
        const locations = generateShip(size);
        const hasCollision = locations.some(loc => occupied.has(loc));

        if (!hasCollision) {
          locations.forEach(loc => occupied.add(loc));
          newShips.push({
            name,
            locations,
            hits: Array(size).fill(""),
            image,
          });
          created++;
        }

        attempts++;
      }

      if (attempts >= maxAttempts) {
        console.warn(`Max attempts reached when placing ${name}. Board may be too small.`);
      }
    }

    setShips(newShips);
  }, [boardSize]);

  useEffect(() => {
    generateShipLocations();
  }, [generateShipLocations]);

  return { ships, setShips, shipsSunk, setShipsSunk, generateShipLocations };
}
