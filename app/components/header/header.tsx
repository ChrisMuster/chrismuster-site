"use client";

import { useState } from "react";
import Image from "next/image";

import content from "@/app/data/content.json";
import { scrollToSection } from "@/utils/utils";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { header } = content;

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-xxsmall">
        {/* Logo */}
        <div className="flex items-center">
          <Image 
            src={header.logo} 
            alt="Logo"  
            width={50} 
            height={50}
            sizes="(max-width: 50px) 50px"
          />
          <span className="text-2xl font-bold ml-2">{header.title}</span>
        </div>

        {/* Navbar */}
        <nav className="hidden md:flex space-x-6">
          {header.nav.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section.toLowerCase().replace(" ", "-"))}
              className="hover:text-[var(--color-blue)] transition"
            >
              {section}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl hover:text-[var(--color-blue)]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          {header.nav.map((section) => (
            <button
              key={section}
              onClick={() => {
                scrollToSection(section.toLowerCase().replace(" ", "-"));
                setMenuOpen(false); // Close menu after clicking
              }}
              className="block w-full text-left p-xxsmall hover:bg-gray-100"
            >
              {section}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
