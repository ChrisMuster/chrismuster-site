import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

// Custom text shadow utility plugin  
const textShadowPlugin = function ({ addUtilities }: PluginAPI) {
  const textShadowUtilities = {
    ".text-shadow": {
      textShadow: "2px 2px 0 rgba(0, 0, 0, 0.50)",
    },
    ".text-shadow-md": {
      textShadow: "3px 3px 0 rgba(0, 0, 0, 0.50)",
    },
    ".text-shadow-lg": {
      textShadow: "4px 4px 0 rgba(0, 0, 0, 0.50)",
    },
    ".text-shadow-none": {
      textShadow: "0 0 transparent",
    },
  };

  addUtilities(textShadowUtilities);
};

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.{html,js}",
    "./app/globals.css",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: "var(--color-gold)",
      },
      screens: {
        xs: "375px",  // Extra small screens (iPhones)
        sm: "480px",  // Standard mobile screens (Portrait)
        md: "768px",  // Medium screen (tablet)
        lg: "1024px", // Large screen (desktop)
        xl: "1280px", // Extra large screen
        xxl: "1600px", // Extra extra large screen
      },
      padding: {
        none: "0px", // Custom class for no padding
        xxsmall: "1rem", // Custom class for xxsmall padding 16px
        xsmall: "1.5rem", // Custom class for xsmall padding 24px
        small: "2rem", // Custom class for small padding 32px
        medium: "3rem", // Custom class for medium padding 48px
        large: "4rem", // Custom class for large padding 64px
        xlarge: "6rem", // Custom class for xlarge padding 96px
        xxlarge: "8rem", // Custom class for xxlarge padding 128px
      },
      margin: {
        none: "0px",
        xxsmall: "1rem", // 16px
        xsmall: "1.5rem", // 24px
        small: "2rem", // 32px
        medium: "3rem", // 48px
        large: "4rem", // 64px
        xlarge: "6rem", // 96px
        xxlarge: "8rem", // 128px
      },
    },
  },
  variants: {
    padding: ["responsive"], // Enable responsive variants for padding
    margin: ["responsive"],
  },
  plugins: [textShadowPlugin],
} satisfies Config;
