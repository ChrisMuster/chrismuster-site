import dynamic from "next/dynamic";

import Section from "@/components/section/section";
import { Accordion, AccordionTab } from "@/components/accordion/accordion";
import CoinFlipper from "@/components/coins/coinflipper";

import content from "@/app/data/content.json";

// Lazy load game components to reduce initial bundle size
const RPSLSGame = dynamic(() => import("@/components/RPSLSGame/RPSLSGame"), {
  loading: () => <p className="text-center">Loading game...</p>,
});

const Battleship = dynamic(() => import("@/components/battleship/battleship"), {
  loading: () => <p className="text-center">Loading game...</p>,
});

export default function CodeChallenges() {
  const { code_challenges } = content;

  return (
    <Section id="code-challenges">
      <h2 className="text-4xl my-small text-center">{code_challenges.title}</h2>
      <div className="w-full bg-[var(--background)] h-auto">
        <Accordion>
          <AccordionTab title="Rock, Paper, Scissors, Lizard, Spock">
            <RPSLSGame />
          </AccordionTab>
          <AccordionTab title="Battleship">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl">Battleship</h2>
              <p className="mb-4">Find and destroy all 5 of the computer&apos;s ships!</p>
              <Battleship />
            </div>
          </AccordionTab>
          <AccordionTab title="Coin Flipper">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl">Coin Flipper</h2>
              <p className="mb-4">Continuously flips coins until three Heads in a row are found, then shows the results.</p>
              <CoinFlipper />
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    </Section>
  )
}
