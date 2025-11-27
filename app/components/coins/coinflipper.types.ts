import { AnimationPlaybackControls } from "framer-motion";

export type Result = 'heads' | 'tails';

export interface CoinState {
  id: number;
  result: Result | null;
  controls: AnimationPlaybackControls;
}
