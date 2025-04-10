import { renderHook, act } from "@testing-library/react";
import { useShips } from "@/components/battleship/useShips";

describe("useShips integration", () => {
  const boardSize = 8;
  const iterations = 1000;

  it(`generates ships with no overlapping locations over ${iterations} runs`, () => {
    for (let i = 0; i < iterations; i++) {
      const { result, unmount } = renderHook(() => useShips(boardSize));

      act(() => {
        result.current.generateShipLocations();
      });

      const allLocations = result.current.ships.flatMap(ship => ship.locations);
      const uniqueLocations = new Set(allLocations);

      expect(uniqueLocations.size).toBe(allLocations.length);

      unmount();
    }
  });
});
