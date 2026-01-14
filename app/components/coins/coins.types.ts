export type Result = "heads" | "tails";

export interface CoinProps {
  result: Result;
  onFlipComplete: () => void;
  shouldAnimate: boolean;
  size?: number;
  highlight?: boolean;
}
