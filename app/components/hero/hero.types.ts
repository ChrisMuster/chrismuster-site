import { ReactNode } from "react";

export interface HeroProps {
  image?: string; // Background image source
  imageAlt: string; // Alt text for the image
  overlayAlignment?: "left" | "center" | "right"; // Controls overlay positioning
  textAlignment?: "left" | "center" | "right"; // Controls text alignment inside the overlay
  children?: ReactNode; // Any content inside the Hero component
  className?: string; // Optional custom styles
}
