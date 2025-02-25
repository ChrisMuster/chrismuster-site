
import Section from "@/components/section/section";
import { Accordion, AccordionTab } from "@/components/accordion/accordion";
import RPSLSGame from "@/components/RPSLSGame/RPSLSGame";

import content from "@/app/data/content.json";

export default function CodeChallenges() {
  const { code_challenges } = content;

  return (
    <Section id="code-challenges" bgColor="bg-[gray]">
      <h2 className="text-4xl my-small text-center">{code_challenges.title}</h2>
      <div className="w-full bg-white h-auto">
        <Accordion>
          <AccordionTab title="Rock, Paper, Scissors, Lizard, Spock">
            <RPSLSGame />
          </AccordionTab>
        </Accordion>
      </div>
    </Section>
  )
}
