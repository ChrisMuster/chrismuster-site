
import Section from "@/components/section/section";
import Hero from "@/components/hero/hero";
import Content from "@/components/content/content";
import Button from "@/components/ui/button";

import content from "@/app/data/content.json";
import { scrollToSection } from "@/utils/utils";

export default function About() {
  const { about } = content;

  return (
    <Section id="about" fullWidth minHeight="screen">
      <Hero image={about.hero.image} imageAlt={about.hero.imageAlt} overlayAlignment="left" textAlignment="left">
        <h1 className="text-4xl font-bold px-8">{about.hero.title}</h1>
        <h2 className="text-2xl font-bold px-8">{about.hero.subtitle}</h2>
      </Hero>
      <div className="p-8 md:px-12 lg:px-24 xl:px-32 xxl:max-w-[1425px] xxl:mx-auto">
        <Content imageSrc={about.content_img} useBackgroundImage>
          <h3 className="text-2xl font-bold mb-4">{about.title}</h3>
          
          <p className="text-lg mb-4">{about.text_1}</p>
          <p className="text-lg">{about.text_2}</p>

          <Button variant="primary" size="medium" className="w-fit mt-6" onClick={() => scrollToSection("contact")}>
            {about.button_text}
          </ Button>
        </Content>
      </div>
    </Section>
  )
}
