"use client";

import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/images/logos/CM-logo-round.png" alt="Logo" priority width={50} height={50} />
          <span className="text-2xl text-gray-700 font-bold ml-2">Chris Muster</span>
        </div>

        {/* Navbar */}
        <nav className="hidden md:flex space-x-6">
          {["About", "Code Challenges", "Projects", "Websites", "Contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section.toLowerCase().replace(" ", "-"))}
              className="text-gray-700 hover:text-blue transition"
            >
              {section}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700 hover:text-blue"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          {["About", "Code Challenges", "Projects", "Websites", "Contact"].map((section) => (
            <button
              key={section}
              onClick={() => {
                scrollToSection(section.toLowerCase().replace(" ", "-"));
                setMenuOpen(false); // Close menu after clicking
              }}
              className="block w-full text-left p-3 text-gray-700 hover:bg-gray-100"
            >
              {section}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
