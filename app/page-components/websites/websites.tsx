
import Section from "@/components/section/section";
import Card from "@/components/card/card";
import Grid from "@/components/grid/grid";

import content from "@/app/data/content.json";

export default function Websites() {
  const { websites } = content;

  return (
    <Section id="websites">
      <h2 className="text-4xl my-small text-center">{websites.title}</h2>
      <div className="w-full bg-[var(--background)] h-full">
        <Grid gap="medium" sm={1} md={2} xl={3}>
          <Card
            imageSrc={websites.card_1.image}
            imageAlt={websites.card_1.imageAlt}
            title={websites.card_1.title}
            subtitle={websites.card_1.subtitle}
            text={websites.card_1.text}
            buttonText={websites.card_1.button_text}
            buttonLink={websites.card_1.button_link}
            shadow="light"
          />
          <Card
            imageSrc={websites.card_2.image}
            imageAlt={websites.card_2.imageAlt}
            title={websites.card_2.title}
            subtitle={websites.card_2.subtitle}
            text={websites.card_2.text}
            buttonText={websites.card_2.button_text}
            buttonLink={websites.card_2.button_link}
            shadow="light"
          />
          <Card
            imageSrc={websites.card_3.image}
            imageAlt={websites.card_3.imageAlt}
            title={websites.card_3.title}
            subtitle={websites.card_3.subtitle}
            text={websites.card_3.text}
            buttonText={websites.card_3.button_text}
            buttonLink={websites.card_3.button_link}
            shadow="light"
          />
        </Grid>
      </div>
    </Section>
  )
}
