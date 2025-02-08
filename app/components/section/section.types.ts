import { ReactNode } from "react";

export interface SectionProps {
  id?: string;
  children: ReactNode;
  fullWidth?: boolean; // Optional prop to make the section full width
  className?: string; // Allow additional classes
  spacing?: "none" | "small" | "medium" | "large";
}
