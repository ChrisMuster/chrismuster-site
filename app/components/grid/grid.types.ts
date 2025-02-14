import { ReactNode } from "react";

export interface GridProps {
  children: ReactNode;
  gap?: "small" | "medium" | "large"; // Controls spacing between items
  sm?: number; // Columns on small screens
  md?: number; // Columns on medium screens
  lg?: number; // Columns on large screens
  xl?: number; // Columns on extra-large screens
  className?: string; // Optional additional styling
}
