"use client";

import { useState } from "react";
import Image from "next/image";

import { AccordionProps, AccordionTabProps } from "@/components/accordion/accordion.types";


export function Accordion({ children, className = "" }: AccordionProps) {
  return (
    <div className={`w-full ${className}`}>
      {children}
    </div>
  );
}

export function AccordionTab({ title, children, openByDefault = false, className = "" }: AccordionTabProps) {
  const [isOpen, setIsOpen] = useState(openByDefault);

  return (
    <div className={`border-b border-gray-300 ${className}`}>
      {/* Tab Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition"
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
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[1000px] p-4" : "max-h-0 p-0"
          }`}
      >
        {children}
      </div>
    </div>
  );
}