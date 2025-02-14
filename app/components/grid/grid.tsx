import { GridProps } from "@/components/grid/grid.types";

export default function Grid({
  children,
  gap = "medium",
  sm,
  md,
  lg,
  xl,
  className = "",
}: GridProps) {
  // Define Tailwind classes dynamically
  const gapClass = gap === "small" ? "gap-4" : gap === "medium" ? "gap-6" : "gap-8";

  const gridClasses: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  // Conditionally apply only defined breakpoints
  const responsiveClasses = [
    sm ? gridClasses[sm] : "",
    md ? `md:${gridClasses[md]}` : "",
    lg ? `lg:${gridClasses[lg]}` : "",
    xl ? `xl:${gridClasses[xl]}` : "",
  ]
    .filter(Boolean) // Remove any empty strings
    .join(" ");

  return <div className={`grid ${responsiveClasses} ${gapClass} ${className}`}>{children}</div>;
}
