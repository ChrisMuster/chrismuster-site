import Image from "next/image";
import { cleanClassNames } from "@/utils/utils";
import { ContentProps } from "@/components/content/content.types";

export default function Content({
  imageSrc = "/images/placeholders/image-placeholder-600x400.png", // Default placeholder image
  imageAlt = "Content image",
  reverse = false,
  width = "50-50",
  border = false,
  rounded = false, // New prop for rounded corners
  shadow = false,
  useBackgroundImage = false, // New option to use a background image
  children,
}: ContentProps) {
  // Define width classes
  const widthClasses = {
    "50-50": ["lg:w-1/2", "lg:w-1/2"],
    "33-67": ["lg:w-1/3", "lg:w-2/3"],
    "67-33": ["lg:w-2/3", "lg:w-1/3"],
  };

  // Determine correct left and right widths based on reverse prop
  const [leftWidth, rightWidth] = reverse
    ? widthClasses[width].reverse() // Flip for reversed layout
    : widthClasses[width]; // Default order

  // Apply optional styles
  const borderClass = border ? "border border-gray-300" : "";
  const roundedClass = border && rounded ? "rounded-lg" : ""; // Rounded only if border is true
  const shadowClass = shadow ? "shadow-lg" : "";
  const flexDirection = reverse ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <div
      className={cleanClassNames(
        "content flex flex-col lg:flex-row w-full items-stretch gap-6 lg:gap-8 p-6",
        flexDirection,
        borderClass,
        roundedClass,
        shadowClass
      )}
    >
      {/* Text Section */}
      <div className={cleanClassNames("content-text w-full flex-auto lg:flex-none", leftWidth)}>
        {children}
      </div>

      {/* Image Section */}
      <div
        className={cleanClassNames(
          "content-img w-full order-first lg:order-none relative lg:flex-none min-h-[250px] lg:min-h-0",
          rightWidth
        )}
      >
        {useBackgroundImage ? (
          <div
            className="w-full h-full bg-cover xxl:bg-contain xxl:bg-no-repeat bg-center min-h-[250px] lg:min-h-0"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
        ) : (
            <div className="relative w-full h-full min-h-[250px] lg:min-h-0">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill // Makes the image cover its container
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cleanClassNames("object-cover", roundedClass)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
