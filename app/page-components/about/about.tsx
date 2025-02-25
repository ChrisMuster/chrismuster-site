
import Section from "@/components/section/section";
import Hero from "@/components/hero/hero";

import content from "@/app/data/content.json";
import { scrollToSection } from "@/utils/utils";

export default function About() {
  const { about } = content;

  return (
    <Section id="about" fullWidth>
      <Hero image={about.hero.image} imageAlt={about.hero.imageAlt} overlayAlignment="left" textAlignment="left">
        <h1 className="text-4xl font-bold">{about.hero.title}</h1>
        <h2 className="text-2xl font-bold">{about.hero.subtitle}</h2>
      </Hero>
      <div className="p-small md:px-medium lg:px-xlarge xl:px-xxlarge">
        <h3 className="text-2xl font-bold mb-xxsmall">{about.title}</h3>
        <p className="text-lg mb-xxsmall">{about.text_1}</p>
        <p className="text-lg">{about.text_2}</p>
        <button
          onClick={() => {
            scrollToSection("contact");
          }}
          className="w-fit mt-xsmall bg-[var(--color-blue)] hover:bg-blue-900 text-white px-xxsmall py-2 rounded-md">
          {about.button_text}
        </button>
      </div>
    </Section>
  )
}
