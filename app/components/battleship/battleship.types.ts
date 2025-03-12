export interface Ship {
  locations: string[];
  hits: string[];
}

export interface CellProps {
  id: string;
  isHit?: boolean;
  isMiss?: boolean;
  isLabel?: boolean;
  text?: string;
  onClick?: () => void;
  className?: string;
}
