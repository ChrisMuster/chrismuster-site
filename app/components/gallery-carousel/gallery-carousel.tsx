"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useDrag } from "@use-gesture/react";
import { GalleryCarouselProps } from "@/components/gallery-carousel/gallery-carousel.types";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Image from "next/image";
import Modal from "@/components/modal/modal";
import { cleanClassNames } from "@/utils/utils";

export default function GalleryCarousel({ images, showCaptions = false, className = "" }: GalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);

  const mainImageRef = useRef<HTMLDivElement>(null);
  const modalImageRef = useRef<HTMLDivElement>(null);

  const [visibleThumbnails, setVisibleThumbnails] = useState(5);

  useEffect(() => {
    const updateVisibleThumbnails = () => {
      setVisibleThumbnails(window.innerWidth < 768 ? 3 : 5);
    };
    updateVisibleThumbnails();
    window.addEventListener("resize", updateVisibleThumbnails);
    return () => window.removeEventListener("resize", updateVisibleThumbnails);
  }, []);

  const thumbnailWidth = 90;
  const partialThumbnailWidth = 40;

  const updateIndex = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex);
    setScrollIndex(() => {
      const maxScrollIndex = Math.max(0, images.length - visibleThumbnails);
      const newScrollIndex = Math.min(Math.max(0, newIndex - Math.floor(visibleThumbnails / 2)), maxScrollIndex);

      if (newScrollIndex >= maxScrollIndex) {
        return maxScrollIndex + 1; // Pushes last thumbnail image fully into view
      }

      return newScrollIndex;
    });
  }, [images.length, visibleThumbnails]);

  const showNextImage = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % images.length;
      updateIndex(newIndex);
      return newIndex;
    });
  }, [images.length, updateIndex]);

  const showPrevImage = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = (prev - 1 + images.length) % images.length;
      updateIndex(newIndex);
      return newIndex;
    });
  }, [images.length, updateIndex]);

  const selectImage = (index: number) => {
    updateIndex(index);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const scrollThumbnails = (direction: "left" | "right") => {
    const maxScrollIndex = Math.max(0, images.length - visibleThumbnails);

    if (direction === "left" && scrollIndex > 0) {
      setScrollIndex((prev) => prev - 1);
    } else if (direction === "right") {
      setScrollIndex((prev) => {
        const newScrollIndex = prev + 1;

        // Ensure last image is fully visible by adding an extra offset
        if (newScrollIndex >= maxScrollIndex) {
          return maxScrollIndex + 1; // Pushes last thumbnail image fully into view
        }
        return newScrollIndex;
      });
    }
  };

  // Swipe and Drag Handling using use-gesture
  const bindDragSwipe = useDrag(
    ({ movement: [mx], last, velocity, direction, cancel }) => {
      const distanceThreshold = 50; // Minimum movement to trigger navigation
      const speedThreshold = 0.3; // Swipe speed threshold

      if (last) {
        if (Math.abs(mx) > distanceThreshold || velocity[0] > speedThreshold) {
          if (direction[0] > 0) {
            updateIndex((currentIndex - 1 + images.length) % images.length);
          } else if (direction[0] < 0) {
            updateIndex((currentIndex + 1) % images.length);
          }
        } else {
          cancel(); // Prevents accidental swipes on small movements
        }
      }
    },
    {
      axis: "x",
      pointer: { touch: true, mouse: true }, // Enables both mouse drag & touch swipe
      threshold: 10,
      filterTaps: true,
    }
  );

  return (
    <div className={cleanClassNames("gallery-carousel w-full flex flex-col items-center", className)}>
      {/* Navigation Controls (Only on Medium Screens & Above) */}
      <div className="flex items-center w-full max-w-3xl justify-between mt-xxsmall">
        <button
          onClick={showPrevImage}
          className="hidden md:block hover:text-[var(--color-blue)] transition-colors"
          title="Previous"
        >
          <ChevronLeft size={40} />
        </button>

        <div
          className="relative flex justify-center items-center w-full max-w-3xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Main Image Container */}
          <div
            {...bindDragSwipe()}
            ref={mainImageRef}
            className="relative w-full max-w-[800px] h-auto aspect-[4/3] flex justify-center items-center overflow-hidden" 
            style={{ userSelect: "none", pointerEvents: "auto" }}
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt || "Gallery Image"}
              title={images[currentIndex].title || ""}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 800px"
              className="object-contain rounded-lg"
              draggable={false}
            />

            {/* Expand Icon (Visible Only When Hovering) */}
            {(isHovering || visibleThumbnails === 3) && (
              <button
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 p-2 rounded-full text-white transition-opacity"
                onClick={openModal}
              >
                <Expand size={24} />
              </button>
            )}
          </div>
        </div>

        <button
          onClick={showNextImage}
          className="hidden md:block hover:text-[var(--color-blue)] transition-colors"
          title="Next"
        >
          <ChevronRight size={40} />
        </button>
      </div>

      {/* Captions */}
      {showCaptions && images[currentIndex].title && (
        <p className="text-center text-lg font-semibold mt-2">{images[currentIndex].title}</p>
      )}

      {/* Thumbnails */}
      <div className="thumbnails relative mt-xxsmall w-full max-w-3xl overflow-hidden flex items-center justify-center">
        <button
          onClick={() => scrollThumbnails("left")}
          disabled={scrollIndex === 0}
          className="hover:text-[var(--color-blue)] transition-colors disabled:opacity-50"
          title="Previous"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Thumbnails Container - This will shift based on the active index */}
        <div className="relative w-[calc(5*90px+40px)] overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${scrollIndex * (thumbnailWidth * 0.95) }px)`, minWidth: `${(visibleThumbnails + 1) * thumbnailWidth}px` }}
          >
            {images.map((image, index) => {
              const isActive = index === currentIndex;
              const isPartiallyVisible = index === scrollIndex + visibleThumbnails; // 6th image should be partially visible

              return (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className="relative flex-shrink-0"
                  style={{
                    width: isPartiallyVisible ? `${partialThumbnailWidth}px` : `${thumbnailWidth}px`,
                    opacity: isActive ? 1 : 0.7,
                    transition: "width 0.3s ease",
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt || "Thumbnail"}
                    title={image.title || ""}
                    width={thumbnailWidth}
                    height={60}
                    className={`w-full h-[60px] object-cover rounded-lg border-2 ${isActive ? "border-blue-500" : "border-transparent"} cursor-pointer`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => scrollThumbnails("right")}
          disabled={scrollIndex >= images.length - visibleThumbnails}
          className="hover:text-[var(--color-blue)] transition-colors disabled:opacity-50"
          title="Next"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div 
          {...bindDragSwipe()} 
          ref={modalImageRef}
          className="relative flex justify-center items-center p-xsmall w-[95vw] max-w-[1100px] min-h-[500px]"
          style={{ touchAction: "none", userSelect: "none", pointerEvents: "auto" }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrevImage();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 hover:text-[var(--color-blue)] transition-colors hidden md:block z-50"
            title="Previous"
          >
            <ChevronLeft size={40} />
          </button>

          <Image 
            src={images[currentIndex].src} 
            alt={images[currentIndex].alt || "Enlarged Image"} 
            title={images[currentIndex].title || ""} 
            fill 
            sizes="(max-width: 1280px) 90vw, 1100px" 
            className="object-contain rounded-lg" 
            draggable={false}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              showNextImage();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-[var(--color-blue)] transition-colors hidden md:block z-50"
            title="Next"
          >
            <ChevronRight size={40} />
          </button>
        </div>
        {/* Dot Navigation */}
        <div className="flex justify-center mt-xxsmall space-x-2 pb-xxsmall">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => updateIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "w-4 h-3 bg-[var(--color-blue)]" : "bg-gray-400"}`}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
}
