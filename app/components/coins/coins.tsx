"use client";

import React, { useEffect, useRef, useState } from "react";
import { CoinProps } from "./coins.types";
import { cleanClassNames } from "@/utils/utils";

const Coin: React.FC<CoinProps> = ({
  result,
  onFlipComplete,
  shouldAnimate,
  size = 80,
  highlight = false,
}) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [animationDone, setAnimationDone] = useState(!shouldAnimate);

  useEffect(() => {
    if (!shouldAnimate) {
      // Immediately show correct face
      const rotation = result === "heads" ? "rotateY(0deg)" : "rotateY(180deg)";
      if (innerRef.current) {
        innerRef.current.style.transform = rotation;
      }
    }
  }, [shouldAnimate, result]);

  const handleAnimationEnd = () => {
    // Snap to final face after spin
    const rotation = result === "heads" ? "rotateY(0deg)" : "rotateY(180deg)";
    if (innerRef.current) {
      innerRef.current.style.transform = rotation;
    }
    setAnimationDone(true);
    onFlipComplete();
  };

  return (
    <div
      className="inline-block"
      style={{
        perspective: 1000,
        width: size,
        height: size,
        margin: "0 8px",
      }}
    >
      <div
        ref={innerRef}
        className={cleanClassNames(
          "relative w-full h-full rounded-full shadow-lg border-4 transition-all",
          highlight ? "border-green-500 scale-105" : "border-yellow-600",
          shouldAnimate && !animationDone ? "animate-spin-coin" : ""
        )}
        style={{
          transformStyle: "preserve-3d",
        }}
        onAnimationEnd={handleAnimationEnd}
      >
        {/* HEADS Face */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="30" fill="#FFD93B" stroke="#B58300" strokeWidth="4" />
            <circle cx="32" cy="24" r="10" fill="#F4A261" />
            <path d="M22 44c0-5 20-5 20 0v4H22v-4z" fill="#E76F51" />
            <circle cx="24" cy="22" r="2" fill="#000" />
            <circle cx="40" cy="22" r="2" fill="#000" />
          </svg>
        </div>

        {/* TAILS Face */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="30" fill="#FED766" stroke="#B58300" strokeWidth="4" />
            <polygon
              points="32,14 36,28 52,28 38,36 42,50 32,40 22,50 26,36 12,28 28,28"
              fill="#6A4C93"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Coin;
