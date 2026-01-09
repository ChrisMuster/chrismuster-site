"use client";

import React, { useState } from "react";
import Coin from "@/components/coins/coins";
import { Result } from "@/components/coins/coinflipper.types";

interface CoinRecord {
  result: Result;
  shouldAnimate: boolean;
}

const getRandomResult = (): Result =>
  Math.random() < 0.5 ? "heads" : "tails";

const CoinFlipper: React.FC = () => {
  const [results, setResults] = useState<CoinRecord[]>([]);
  const [message, setMessage] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);
  const [highlightFinalThree, setHighlightFinalThree] = useState(false);

  const reset = async () => {
    setResults([]);
    setMessage("");
    setHighlightFinalThree(false);
    setIsFlipping(false);
    await new Promise((r) => setTimeout(r, 0));
  };

  const handleFlipComplete = (index: number) => {
    setResults((prev) => {
      const updated = prev.map((coin, i) =>
        i === index ? { ...coin, shouldAnimate: false } : coin
      );

      // Check for final 3 completed heads in updated results
      const lastThree = updated.slice(-3);
      const allHeads = lastThree.length === 3 && lastThree.every((r) => r.result === "heads");
      const allDone = lastThree.every((r) => !r.shouldAnimate);

      // Only if all conditions met
      if (allHeads && allDone) {
        setHighlightFinalThree(true);
      }

      return updated;
    });
  };

  const flipSequence = async () => {
    // Inline reset logic to ensure true clearing
    if (results.length > 0) await reset();

    setIsFlipping(true);
    const newResults: CoinRecord[] = [];

    let streak = 0;
    while (streak < 3) {
      const result = getRandomResult();
      streak = result === "heads" ? streak + 1 : 0;

      newResults.push({ result, shouldAnimate: true });
      setResults([...newResults]);

      await new Promise((r) => setTimeout(r, 3700));
    }

    setMessage(`It took ${newResults.length} flips to get 3 Heads in a row.`);
    setIsFlipping(false);
  };

  const isFinalThree = (index: number) =>
    highlightFinalThree && index >= results.length - 3;

  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex flex-wrap justify-center mb-6 gap-3">
        {results.map(({ result, shouldAnimate }, index) => (
          <Coin
            key={`coin-${index}`}
            result={result}
            shouldAnimate={shouldAnimate}
            onFlipComplete={() => handleFlipComplete(index)}
            highlight={isFinalThree(index)}
          />
        ))}
      </div>

      <div className="flex space-x-4">
        <button
          disabled={isFlipping}
          onClick={flipSequence}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {isFlipping ? "Flipping..." : "Start Flipping"}
        </button>

        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-300 rounded"
          disabled={isFlipping || results.length === 0}
        >
          Reset
        </button>
      </div>

      {message && (
        <p className="mt-4 text-lg font-semibold text-center" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
};

export default CoinFlipper;
