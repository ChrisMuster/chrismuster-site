import { ReactNode } from "react";

export interface Tab {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: Tab[]; // Array of tabs
  activeTab: string; // ID of the active tab
  onTabChange: (tabId: string) => void; // Function to change active tab
}

export interface TabsSectionProps extends TabsProps {
  children: ReactNode;
}
