export interface GalleryCarouselProps {
  images: { 
    src: string; 
    alt?: string; 
    title?: string 
  }[]; // Array of objects for image details
  showCaptions?: boolean; // Optional: Display captions below images
  className?: string; // Optional custom styles
}
