export interface ContentProps {
  imageSrc?: string; // Optional image URL (uses placeholder by default)
  imageAlt?: string; // Alternative text for the image
  reverse?: boolean; // If true, reverses text and image order
  width?: "50-50" | "33-67" | "67-33"; // Layout proportion
  border?: boolean; // Adds border
  rounded?: boolean; // Adds rounded corners when border is true
  shadow?: boolean; // Adds box shadow
  useBackgroundImage?: boolean; // If true, uses background image instead of Next.js Image
  children: React.ReactNode; // Text content inside
}
