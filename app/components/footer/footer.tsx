"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import content from "@/app/data/content.json";

export default function Footer() {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const { footer } = content;

  // Ensure year updates in case user stays on site for long time
  useEffect(() => {
    const interval = setInterval(() => {
      setYear(new Date().getFullYear());
    }, 1000 * 60 * 60 * 24); // Update every day
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-gray-900 text-white text-center py-6">
      <div className="container mx-auto flex flex-col items-center">
        {/* Logo */}
        <Image 
          src={footer.logo} 
          alt="Chris Muster Logo"
          className="w-auto h-auto max-w-[200px]"
          width={200} 
          height={200} />

        {/* Copyright Message */}
        <p className="mt-4 text-sm">
          &copy; {year} {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
