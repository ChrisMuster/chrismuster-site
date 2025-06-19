
import Section from "@/components/section/section";
import Hero from "@/components/hero/hero";
import Content from "@/components/content/content";
import Button from "@/components/ui/button";

import content from "@/app/data/content.json";
import { scrollToSection } from "@/utils/utils";

export default function About() {
  const { about } = content;

  return (
    <Section id="about" fullWidth>
      <Hero image={about.hero.image} imageAlt={about.hero.imageAlt} overlayAlignment="left" textAlignment="left">
        <h1 className="text-4xl font-bold px-small">{about.hero.title}</h1>
        <h2 className="text-2xl font-bold px-small">{about.hero.subtitle}</h2>
      </Hero>
      <div className="p-small md:px-medium lg:px-xlarge xl:px-xxlarge xxl:max-w-[1425px] xxl:mx-auto">
        <Content imageSrc={about.content_img} useBackgroundImage>
          <h3 className="text-2xl font-bold mb-xxsmall">{about.title}</h3>
          
          <p className="text-lg mb-xxsmall">{about.text_1}</p>
          <p className="text-lg">{about.text_2}</p>

          <Button variant="primary" size="medium" className="w-fit mt-xsmall" onClick={() => scrollToSection("contact") }>
            {about.button_text}
          </Button>
        </Content>
      </div>
    </Section>
  )
}
