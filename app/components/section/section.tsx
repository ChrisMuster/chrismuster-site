"use client";

import { SectionProps } from "@/components/section/section.types";

export default function Section({ 
  id, 
  children, 
  fullWidth = false, 
  className = "", 
  spacing = "medium", // Default spacing is "medium" 
}: SectionProps) {
  return (
    <section
      id={id}
      className={`h-screen flex flex-col items-center justify-center ${fullWidth ? "w-full" : "px-6 md:px-12 lg:px-24 xl:px-32"
        } mb-${spacing} ${className}`}
    >
      {children}
    </section>
  );
}
