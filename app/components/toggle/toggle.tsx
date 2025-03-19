"use client";

import { ToggleProps } from "./toggle.types";
import { Sun, Moon } from "lucide-react";

export default function Toggle({ 
  checked, 
  onChange, 
  iconOn: IconOn = Moon, // Default to Moon for Dark mode
  iconOff: IconOff = Sun, // Default to Sun for Light mode
}: ToggleProps) {
  return (
    <button
      onClick={onChange}
      className="relative w-[74px] h-[36px] rounded-full overflow-hidden cursor-pointer focus:outline-none"
      aria-label="Toggle Theme"
    >

      {/* Hidden Label (for accessibility, linked to hidden checkbox) */}
      <label id="theme-toggle" htmlFor="theme-toggle" className="sr-only"> {/* class = Screen Reader Only */}
        Toggle Theme
      </label>

      {/* Hidden checkbox for accessibility */}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="absolute w-full h-full opacity-0"
        aria-labelledby="theme-toggle"
      />

      {/* Background (switches color) */}
      <div
        className={`absolute inset-0 transition-colors duration-300 ${checked ? "bg-[var(--color-gold)]" : "bg-[var(--color-blue)]"
          }`}
      />

      {/* Toggle Knob (moves left/right) */}
      <div
        className={`absolute top-[4px] left-[4px] w-[28px] h-[28px] flex items-center justify-center rounded-full transition-all duration-300 ${checked ? "translate-x-[38px] bg-[var(--color-blue)]" : "bg-[var(--color-gold)]"
          }`}
      >
        {checked ? <IconOn size={16} className="text-[var(--color-gold)]" /> : <IconOff size={16} className="text-[var(--color-blue)]" />}
      </div>
    </button>
  );
}

// Default Export with Sun/Moon Icons
export function ThemeToggleButton({
  checked,
  onChange,
  iconOn = Moon, // Default to Moon for dark mode
  iconOff = Sun, // Default to Sun for light mode
}: ToggleProps) {
  return <Toggle checked={checked} onChange={onChange} iconOn={iconOn} iconOff={iconOff} />;
}
