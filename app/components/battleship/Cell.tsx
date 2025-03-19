import React from "react";
import { CellProps } from "@/components/battleship/battleship.types";

const getCellText = (isHit: boolean, isMiss: boolean) => {
  if (isHit) return "HIT";
  if (isMiss) return "MISS";
  return "";
};

export const Cell: React.FC<CellProps> = ({ id, isHit, isMiss, isLabel, text, onClick, shipImage }) => {
  const validShipImage = shipImage ? `url(${shipImage})` : "none";
  const cellStyle: React.CSSProperties = isHit ? {
    backgroundImage: validShipImage,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  } : {};

  return (
    <div
      className={`flex items-center justify-center border border-green-400 
      text-xs sm:text-sm md:text-lg xxl:text-2xl font-bold aspect-square w-full h-full ${isLabel ? "bg-gray-400 text-[var(--color-primary)]"
          : isHit ? "bg-red-500 bg-opacity-50 text-white text-shadow-md"
            : isMiss ? "bg-transparent text-green-400 text-shadow-md"
              : "bg-gray-300 bg-opacity-30"
        }`}
      style={cellStyle}
      onClick={isLabel ? undefined : onClick}
    >
      {isLabel ? text || id !== "empty" ? id : "" : getCellText(isHit || false, isMiss || false)}
    </div>
  );
};
