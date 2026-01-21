"use client";

import { useState, memo } from "react";
import Image from "next/image";

import { AccordionProps, AccordionTabProps } from "@/components/accordion/accordion.types";

import { cleanClassNames } from "@/utils/utils";

export function Accordion({ children, className = "" }: AccordionProps) {
  return (
    <div className={cleanClassNames("accordion w-full", className)}>
      {children}
    </div>
  );
}

export const AccordionTab = memo(function AccordionTab({ title, children, openByDefault = false, className = "" }: AccordionTabProps) {
  const [isOpen, setIsOpen] = useState(openByDefault);

  return (
    <div className={cleanClassNames("accordion-tab mb-4", className)}>
      {/* Tab Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="accordion-tab-btn text-[var(--color-primary)] w-full flex justify-between items-center p-4 bg-gray-200 hover:bg-gray-300 transition"
      >
        <span className="font-semibold">{title}</span>
        <Image
          src="/images/icons/chevron-up.svg"
          alt="Chevron icon"
          width={24}
          height={24}
          className={`transition-transform duration-200 ${isOpen ? "rotate-0" : "rotate-180"}`}
        />
      </button>

      {/* Tab Content */}
      <div
        data-testid="accordion-content"
        className={`accordion-tab-content overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[fit] p-4 border border-gray-200" : "max-h-0 p-0"}`}
      >
        {children}
      </div>
    </div>
  );
});
