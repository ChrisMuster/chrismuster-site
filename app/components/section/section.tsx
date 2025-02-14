import { SectionProps } from "@/components/section/section.types";

import { cleanClassNames } from "@/utils/utils";

export default function Section({ 
  id, 
  children, 
  fullWidth = false, 
  className = "", 
  spacing = "none", // Default spacing is "none" and applies to margin-bottom
  bgColor,
}: SectionProps) {
  
  const mbSpacingClasses: Record<string, string> = {
    none: "mb-none",
    xxsmall: "mb-xxsmall",
    xsmall: "mb-xsmall",
    small: "mb-small",
    medium: "mb-medium",
    large: "mb-large",
    xlarge: "mb-xlarge",
    xxlarge: "mb-xxlarge",
  };

  return (
    <section
      id={id}
      className={cleanClassNames("h-auto min-h-screen flex flex-col", fullWidth ? "w-full" : "p-xsmall md:p-medium lg:p-xlarge xl:p-xxlarge", mbSpacingClasses[spacing], bgColor ? bgColor : "", className)}
    >
      {children}
    </section>
  );
}
