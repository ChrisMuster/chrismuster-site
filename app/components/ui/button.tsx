"use client";

import Link from "next/link";
import type { ButtonProps, ButtonVariant, ButtonSize } from "@/components/ui/button.types";
import { cleanClassNames } from "@/utils/utils";

const baseClasses = "rounded-md transition focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[var(--color-blue)] hover:bg-blue-900 text-white",
  secondary: "bg-gray-700 hover:bg-gray-900 text-white",
  tertiary: "bg-gray-300 text-black hover:bg-gray-500 hover:text-white",
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
  variant,
  size,
  disabled = false,
  className = "",
  href,
  target,
  rel,
  type = "button",
  title,
  "aria-label": ariaLabel,
  "aria-disabled": ariaDisabled,
  "data-testid": dataTestId,
}: ButtonProps) {
  // Determine if we're using variants or just className
  // Logic: If a variant is explicitly set OR no className is provided,
  // we use the variant system (which defaults to "primary" with base styles).
  // If only className is provided (no variant), we skip variant styles entirely
  // and let className handle all styling for maximum flexibility.
  const useVariant = variant !== undefined || className === "";
  
  // Build the final className
  const finalClassName = cleanClassNames(
    useVariant ? baseClasses : "", // Base styles only when using variants
    useVariant && variant ? variantClasses[variant || "primary"] : "",
    useVariant && (size || variant) ? sizeClasses[size || "medium"] : "",
    className // Custom className always applied last (can override variants)
  );

  // Render as Link if href is provided (no onClick)
  if (href) {
    return (
      <Link
        href={href}
        className={cleanClassNames(
          finalClassName,
          disabled ? "pointer-events-none" : "cursor-pointer"
        )}
        target={target}
        rel={rel}
        title={title}
        aria-label={ariaLabel}
        aria-disabled={disabled || ariaDisabled}
        data-testid={dataTestId}
      >
        {children}
      </Link>
    );
  }

  // Render as button with onClick
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={finalClassName}
      title={title}
      aria-label={ariaLabel}
      aria-disabled={disabled || ariaDisabled}
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
}
