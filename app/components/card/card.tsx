import { CardProps } from "@/components/card/card.types";
import Image from "next/image";
import Button from "@/components/ui/button";

import { cleanClassNames } from "@/utils/utils";

export default function Card({
  imageSrc = "/images/placeholders/placeholder-428x220.png",
  imageAlt = "Card image",
  subtitle,
  title,
  text,
  buttonText,
  buttonLink = "#",
  onClick,
  shadow,
  className = "",
  external = true,
}: CardProps) {
  const shadowClass = shadow === "light" ? "shadow-light" : shadow === "dark" ? "shadow-dark" : "";

  return (
    <div className={cleanClassNames("card w-full bg-white text-[var(--color-primary)] rounded-lg transition flex flex-col h-full", shadowClass, className)}>
      {/* Image */}
      <div className="w-full h-[220px] rounded-t-lg relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="rounded-t-lg object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>

      {/* Card Content */}
      <div className="p-xsmall flex flex-col flex-grow justify-between">
        <div>
          {subtitle && <p className="text-sm mb-1">{subtitle}</p>}
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="mb-xxsmall">{text}</p>
        </div>

        {/* Button: Uses Button component with href or onClick */}
        <div className="flex justify-start mt-auto">
          <Button
            href={onClick ? undefined : buttonLink}
            onClick={onClick}
            target={onClick || !external ? undefined : "_blank"}
            rel={onClick || !external ? undefined : "noopener noreferrer"}
            className="inline-block bg-[var(--color-blue)] hover:bg-blue-900 text-white px-xxsmall py-2 rounded-md transition cursor-pointer"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
