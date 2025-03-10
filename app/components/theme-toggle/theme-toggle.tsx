"use client";

import { useEffect, useState } from "react";
import { Theme } from "@/components/theme-toggle/theme-toggle.types";
import { ThemeToggleButton } from "@/components/toggle/toggle";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeToggleButton checked={theme === "dark"} onChange={toggleTheme} />
  );
}
