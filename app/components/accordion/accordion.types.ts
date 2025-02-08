import { ReactNode } from "react";

export interface AccordionProps {
  children: ReactNode;
  className?: string;
}

export interface AccordionTabProps {
  title: string;
  children: ReactNode;
  openByDefault?: boolean;
  className?: string;
}
