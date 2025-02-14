import { SectionProps } from "@/components/section/section.types";

export default function Section({ 
  id, 
  children, 
  fullWidth = false, 
  className = "", 
  spacing = "medium", // Default spacing is "medium" and applies to margin-bottom
  bgColor,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`h-auto min-h-screen flex flex-col ${fullWidth ? "w-full" : "p-xsmall md:p-medium lg:p-xlarge xl:p-xxlarge"
        } mb-${spacing} ${bgColor ? bgColor : ""} ${className}`}
    >
      {children}
    </section>
  );
}
