import { HeroProps } from "@/components/hero/hero.types";
import Image from "next/image";

import { cleanClassNames } from "@/utils/utils";

export default function Hero({
  image = "/images/placeholders/hero-placeholder.png",
  imageAlt,
  overlayAlignment = "center",
  textAlignment = "center",
  children,
  className = "",
}: HeroProps) {
  // Define overlay alignment classes (position of overlay)
  const overlayAlignmentClasses: Record<string, string> = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  // Define text alignment classes (alignment of content inside the overlay)
  const textAlignmentClasses: Record<string, string> = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <>
      <div className={cleanClassNames("hero w-full h-[66vh] relative", className)}>
        {/* Hero Image */}
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1920px"
          className="object-cover w-full h-full"
          priority
        />

        {/* Overlay Content (Desktop) */}
        <div
          className={cleanClassNames(
            "absolute inset-0 flex h-full items-center lg:px-24 xl:px-32 xxl:max-w-[1425px] xxl:mx-auto",
            overlayAlignmentClasses[overlayAlignment]
          )}
        >
          <div
            className={cleanClassNames(
              "bg-black bg-opacity-50 text-white lg:p-8 xl:p-12 rounded-lg max-w-3xl hidden lg:flex flex-col",
              textAlignmentClasses[textAlignment]
            )}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Content below the image on smaller screens */}
      <div
        className={cleanClassNames(
          "lg:hidden px-6 md:px-12 pt-8 pb-0 flex flex-col",
          textAlignmentClasses[textAlignment]
        )}
      >
        {children}
      </div>
    </>
  );
}
