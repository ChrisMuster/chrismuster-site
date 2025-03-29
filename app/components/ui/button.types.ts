import { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "success";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}
