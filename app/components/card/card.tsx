import { CardProps } from "@/components/card/card.types";
import Image from "next/image";
import Link from "next/link";

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
}: CardProps) {
  // Default click handler: prevents navigation only if onClick is passed
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      event.preventDefault(); // Stop the link navigation
      onClick(); // Execute the provided function
    }
  };

  const shadowClass = shadow === "light" ? "shadow-light" : shadow === "dark" ? "shadow-dark" : "";

  const cardClasses = [
    "w-full bg-[var(--background)] rounded-lg transition flex flex-col h-full",
    shadowClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses}>
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
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          {subtitle && <p className="text-sm mb-1">{subtitle}</p>}
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="mb-4">{text}</p>
        </div>

        {/* Button: Uses Link but prevents default if onClick is passed */}
        <div className="flex justify-start mt-auto">
          <Link
            href={buttonLink}
            onClick={handleClick}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--color-blue)] hover:bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition cursor-pointer"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}