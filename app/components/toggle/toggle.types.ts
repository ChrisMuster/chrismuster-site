import { LucideIcon } from "lucide-react";

export interface ToggleProps {
  checked: boolean; // Controls if the toggle is on/off
  onChange: () => void; // Function to handle toggle state change
  iconOn?: LucideIcon; // Icon when toggle is ON
  iconOff?: LucideIcon; // Icon when toggle is OFF
}
