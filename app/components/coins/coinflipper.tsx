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

const ANIMATION_DURATION_MS = 2500;
const TARGET_HEADS = 3;

const CoinFlipper: React.FC = () => {
  const [results, setResults] = useState<CoinRecord[]>([]);
  const [message, setMessage] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);
  const [highlightFinalThree, setHighlightFinalThree] = useState(false);
  const [sequenceKey, setSequenceKey] = useState(0);
  const stopFlippingRef = useRef(false);
  const activeSequenceRef = useRef(0);

  const { coinflipper } = content.code_challenges;

  const reset = () => {
    stopFlippingRef.current = true;
    setResults([]);
    setMessage("");
    setHighlightFinalThree(false);
    setIsFlipping(false);
  };

  const handleFlipComplete = (index: number) => {
    setResults((prev) => {
      const updated = prev.map((coin, coinIndex) =>
        coinIndex === index ? { ...coin, shouldAnimate: false } : coin
      );

      // Check for final 3 completed heads in updated results
      const lastThree = updated.slice(-TARGET_HEADS);
      const allHeads = lastThree.length === TARGET_HEADS && lastThree.every((r) => r.result === "heads");
      const allDone = lastThree.every((r) => !r.shouldAnimate);

      // Only if all conditions met
      if (allHeads && allDone) {
        setHighlightFinalThree(true);
      }

      return updated;
    });
  };

  const flipSequence = async () => {
    stopFlippingRef.current = false;
    const mySequenceId = sequenceKey + 1;
    setSequenceKey(mySequenceId);
    activeSequenceRef.current = mySequenceId;
    setIsFlipping(true);
    setResults([]);
    setMessage("");
    setHighlightFinalThree(false);
    
    const newResults: CoinRecord[] = [];

    let streak = 0;
    while (streak < TARGET_HEADS && !stopFlippingRef.current) {
      const result = getRandomResult();
      streak = result === "heads" ? streak + 1 : 0;

      newResults.push({ result, shouldAnimate: true });
      
      if (!stopFlippingRef.current && activeSequenceRef.current === mySequenceId) {
        setResults([...newResults]);
      }

      // Wait before next flip, not after
      if (streak < TARGET_HEADS && !stopFlippingRef.current) {
        await new Promise((r) => setTimeout(r, ANIMATION_DURATION_MS));
      }
    }

    // Wait for final coin animation to complete
    if (!stopFlippingRef.current && activeSequenceRef.current === mySequenceId) {
      await new Promise((r) => setTimeout(r, ANIMATION_DURATION_MS));
    }

    if (!stopFlippingRef.current && activeSequenceRef.current === mySequenceId) {
      const resultMessage = coinflipper.result_message.replace("{count}", String(newResults.length));
      setMessage(resultMessage);
      setIsFlipping(false);
    }
  };

  const isFinalThree = (index: number) =>
    highlightFinalThree && index >= results.length - TARGET_HEADS;

  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex flex-wrap justify-center mb-6 gap-3 min-h-[160px]">
        {results.length === 0 && !isFlipping ? (
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
              key={`coin-${sequenceKey}-${index}`}
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
