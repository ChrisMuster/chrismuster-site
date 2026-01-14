/* eslint-disable @next/next/no-img-element */
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
    if (!shouldAnimate && innerRef.current) {
      const rotation = result === "heads" ? "rotateY(0deg)" : "rotateY(180deg)";
      innerRef.current.style.transform = rotation;
    }
  }, [shouldAnimate, result]);

  const handleAnimationEnd = () => {
    if (innerRef.current) {
      const rotation = result === "heads" ? "rotateY(0deg)" : "rotateY(180deg)";
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
          "relative w-full h-full rounded-full border-4 transition-all duration-300 ease-in-out",
          `${highlight ? "border-green-500 scale-105" : "border-transparent"}`,
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
          <img
            src="/images/coins/Heads-svg.svg"
            alt="Heads"
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>

        {/* TAILS Face */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <img
            src="/images/coins/Tails-svg.svg"
            alt="Tails"
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Coin;
