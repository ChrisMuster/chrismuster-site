export interface CardProps {
  imageSrc?: string;
  imageAlt?: string;
  subtitle?: string;
  title: string;
  text: string;
  buttonText: string;
  buttonLink?: string;
  onClick?: () => void;
  shadow?: "light" | "dark";
  className?: string; // Allow additional styling if needed
}
