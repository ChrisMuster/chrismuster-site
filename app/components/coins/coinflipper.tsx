"use client";

import React, { useState, useRef } from "react";
import Button from "@/components/ui/button";
import Coin from "@/components/coins/coins";
import { Result } from "@/components/coins/coinflipper.types";
import content from "@/app/data/content.json";

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
  const stopFlippingRef = useRef(false);

  const { coinflipper } = content.code_challenges;

  const reset = () => {
    stopFlippingRef.current = true; // Signal to stop flipping
    setResults([]);
    setMessage("");
    setHighlightFinalThree(false);
    setIsFlipping(false);
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
    // Reset if there are previous results
    if (results.length > 0) reset();

    stopFlippingRef.current = false;
    setIsFlipping(true);
    const newResults: CoinRecord[] = [];

    let streak = 0;
    while (streak < 3 && !stopFlippingRef.current) {
      const result = getRandomResult();
      streak = result === "heads" ? streak + 1 : 0;

      newResults.push({ result, shouldAnimate: true });
      setResults([...newResults]);

      await new Promise((r) => setTimeout(r, 2500));
    }

    if (!stopFlippingRef.current) {
      const resultMessage = coinflipper.result_message.replace("{count}", String(newResults.length));
      setMessage(resultMessage);
    }
    setIsFlipping(false);
  };

  const isFinalThree = (index: number) =>
    highlightFinalThree && index >= results.length - 3;

  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex flex-wrap justify-center mb-6 gap-3 min-h-[160px]">
        {results.length === 0 ? (
          // Idle coin - larger and not spinning
          <Coin
            result="heads"
            shouldAnimate={false}
            onFlipComplete={() => {}}
            size={150}
          />
        ) : (
          // Flipping coins
          results.map(({ result, shouldAnimate }, index) => (
            <Coin
              key={`coin-${index}`}
              result={result}
              shouldAnimate={shouldAnimate}
              onFlipComplete={() => handleFlipComplete(index)}
              highlight={isFinalThree(index)}
            />
          ))
        )}
      </div>

      <div className="flex space-x-4">
        <Button 
          variant="primary" 
          disabled={isFlipping} 
          size="medium" 
          className="w-fit" 
          onClick={flipSequence}>
          {isFlipping ? coinflipper.flipping_button : coinflipper.start_button}
        </Button>

        <Button
          variant="tertiary"
          size="medium"
          className="w-fit"
          onClick={reset}>
          {isFlipping ? coinflipper.stop_reset_button : coinflipper.reset_button}
        </Button>
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
