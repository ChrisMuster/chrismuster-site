import { SectionProps } from "@/components/section/section.types";

import { cleanClassNames } from "@/utils/utils";

export default function Section({ 
  id, 
  children, 
  fullWidth = false, 
  className = "", 
  spacing = "none", // Default spacing is "none" and applies to margin-bottom
  bgColor,
  minHeight = "auto", // Default to auto height
}: SectionProps) {
  
  const mbSpacingClasses: Record<string, string> = {
    none: "mb-0",
    xxsmall: "mb-4",
    xsmall: "mb-6",
    small: "mb-8",
    medium: "mb-12",
    large: "mb-16",
    xlarge: "mb-24",
    xxlarge: "mb-32",
  };

  const minHeightClass = minHeight === "screen" ? "min-h-screen" : "";

  return (
    <section
      id={id}
      className={cleanClassNames("h-auto flex flex-col", minHeightClass, fullWidth ? "w-full" : "p-6 md:p-12 lg:px-24 xl:px-32 xxl:max-w-[1425px] xxl:mx-auto", mbSpacingClasses[spacing], bgColor ? bgColor : "", className)}
    >
      {children}
    </section>
  );
}
