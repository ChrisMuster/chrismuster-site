export interface Ship {
  name: string;
  locations: string[];
  hits: string[];
  image: string;
}

export interface CellProps {
  id: string;
  isHit?: boolean;
  isMiss?: boolean;
  isLabel?: boolean;
  text?: string;
  onClick?: () => void;
  shipImage?: string | null;
  className?: string;
}
