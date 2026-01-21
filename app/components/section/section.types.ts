import { ReactNode } from "react";

export interface SectionProps {
  id?: string;
  children: ReactNode;
  fullWidth?: boolean; // Optional prop to make the section full width
  className?: string; // Allow additional classes
  spacing?: "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge";
  bgColor?: string; // Optional prop for background color
  minHeight?: "screen" | "auto"; // Optional prop for minimum height, defaults to "auto"
}
