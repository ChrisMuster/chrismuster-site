
import Section from "@/components/section/section";
import { Accordion, AccordionTab } from "@/components/accordion/accordion";
import RPSLSGame from "@/components/RPSLSGame/RPSLSGame";

import content from "@/app/data/content.json";

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
          <AccordionTab title="Project 2">
            <h2 className="text-3xl">Challenge 2</h2>
            <p>Challenge 2 content</p>
          </AccordionTab>
          <AccordionTab title="Project 3">
            <h2 className="text-3xl">Challenge 3</h2>
            <p>Challenge 3 content</p>
          </AccordionTab>
        </Accordion>
      </div>
    </Section>
  )
}
