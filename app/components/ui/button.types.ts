import { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "success";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  children?: ReactNode;
  onClick?: (event?: React.MouseEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  title?: string;
  "aria-label"?: string;
  "aria-disabled"?: boolean;
  "data-testid"?: string;
}
