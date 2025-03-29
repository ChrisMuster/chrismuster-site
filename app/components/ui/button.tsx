"use client";

import type { ButtonProps, ButtonVariant, ButtonSize } from "@/components/ui/button.types";
import { cleanClassNames } from "@/utils/utils";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[var(--color-blue)] hover:bg-blue-900 text-white",
  secondary: "bg-gray-700 hover:bg-gray-900 text-white",
  success: "bg-green-700 hover:bg-green-900 text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  small: "px-2 py-1 text-sm",
  medium: "px-xxsmall py-2 text-base",
  large: "px-4 py-3 text-lg",
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cleanClassNames(
        `rounded-md transition focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed`,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}
